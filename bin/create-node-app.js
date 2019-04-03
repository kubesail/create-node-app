#!/usr/bin/env node
// @flow

const chalk = require('chalk')
const commander = require('commander')
const fs = require('fs-extra')
const path = require('path')
const { execSync } = require('child_process')
const packageJson = require('../package.json')
const { checkAppName, shouldUseYarn } = require('../src/util')
const ownPath = path.join(__dirname, '..')
const templatePath = path.join(ownPath, 'src', 'template')
const cwd = process.cwd()

if (process.versions.node.split('.')[0] < 8) {
  console.error(
    chalk.red(`
      You are running Node ${process.versions.node}.
      create-node-app requires Node 8 or higher.
      Please update your version of Node.
    `)
  )
  process.exit(1)
}

let projectName

const program = new commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .action(name => (projectName = name))
  .option('--verbose', 'print additional logs')
  .allowUnknownOption()
  .on('--help', () => {
    console.log(`    Only ${chalk.green('<project-directory>')} is required.\n`)
  })
  .parse(process.argv)

createApp(projectName, program.verbose)

async function createApp (appName, verbose) {
  checkAppName(program.name(), appName)
  const useYarn = shouldUseYarn()
  const appPath = path.join(cwd, appName)

  // Create project directory
  try {
    fs.mkdirSync(appPath)
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.error(
        chalk.red(`
          Directory ${appPath} already exists, refusing to overwrite.
        `)
      )
      process.exit(1)
    } else {
      throw err
    }
  }

  // Copy template files
  const modules = ['React', 'Express']
  console.log(
    `\nCreating a new ${modules.map(module => chalk.cyan(module)).join(' + ')} app in ${chalk.green(
      appPath
    )}.\n`
  )
  fs.copySync(templatePath, appPath)

  // Install dependencies
  console.log('Installing packages. This might take a couple of minutes.\n')
  await execSync(`${useYarn ? 'yarnpkg' : 'npm'} install`, {
    cwd: appPath,
    stdio: 'inherit'
  })

  // Display finished message
  const displayedCommand = useYarn ? 'yarn' : 'npm'
  const displayedCommandRun = `${displayedCommand}${useYarn ? '' : ' run'}`
  console.log()
  console.log(`Success! Created ${appName} at ${appPath}`)
  console.log('Inside that directory, you can run several commands:')
  console.log()
  console.log(chalk.cyan(`  ${displayedCommand} start www`))
  console.log('    Starts the React development server.')
  console.log()
  console.log(chalk.cyan(`  ${displayedCommand} start api`))
  console.log('    Starts the Express development server.')
  console.log()
  console.log(chalk.cyan(`  ${displayedCommandRun} build`))
  console.log('    Bundles the app into static files for production.')
  console.log()
  console.log(chalk.cyan(`  ${displayedCommand} test`))
  console.log('    Starts the test runner.')
  console.log()
  console.log(chalk.cyan(`  ${displayedCommandRun} eject-www`))
  console.log('    Removes this tool and copies build dependencies, configuration files')
  console.log('    and scripts into the app directory. If you do this, you can’t go back!')
  console.log()
  console.log('We suggest that you begin by typing:')
  console.log()
  console.log(chalk.cyan(`  cd ${appName}`))
  console.log(`  ${chalk.cyan(`${displayedCommand} start`)}`)
  const readmeExists = false // TODO detect existing files / README
  if (readmeExists) {
    console.log()
    console.log(chalk.yellow('You had a `README.md` file, we renamed it to `README.old.md`'))
  }
  console.log()
  console.log('Happy hacking!')
}

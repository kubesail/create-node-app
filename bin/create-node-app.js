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
const semver = require('semver')

// Target the same node version that react-scripts targets
if (!semver.satisfies(process.version, '>=8.10.0')) {
  console.log(
    chalk.red(
      `You are using Node ${process.version}, which is not supported by Create Node App.\n\n` +
        `Please update to Node 8.10 or higher.\n`
    )
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
  const useYarn = await shouldUseYarn()
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

  const appPackageJsonPath = path.join(appPath, 'package.json')
  const appPackageJson = JSON.parse(fs.readFileSync(appPackageJsonPath))
  appPackageJson.name = appName
  fs.writeFileSync(appPackageJsonPath, JSON.stringify(appPackageJson, null, 2))

  // Install dependencies
  console.log('Installing packages. This might take a couple of minutes.\n')
  await execSync(`${useYarn ? 'yarnpkg' : 'npm'} install`, {
    cwd: appPath,
    stdio: 'inherit'
  })

  // .gitignore files won't be published on NPM, so they must be renamed here
  fs.renameSync(path.join(appPath, 'gitignore'), path.join(appPath, '.gitignore'))
  await execSync(`git init && git add . && git commit -m "initial commit"`, {
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
  console.log(chalk.cyan(`  ${displayedCommand} start`))
  console.log('    Starts the React + Express development servers.')
  console.log()
  console.log(chalk.cyan(`  ${displayedCommandRun} deploy`))
  console.log('    Containerizes and deploys the React + Express apps to Kubernetes.')
  console.log()
  console.log(chalk.cyan(`  ${displayedCommand} test`))
  console.log('    Starts the test runner.')
  console.log()
  console.log(chalk.cyan(`  ${displayedCommandRun} eject-www`))
  console.log('    Removes the Create React App tools and copies build dependencies,')
  console.log('    configuration files and scripts into the app directory. If you do')
  console.log('    this, you can’t go back!')
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

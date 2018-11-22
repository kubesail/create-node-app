// @flow

const validateProjectName = require('validate-npm-package-name')
const chalk = require('chalk')
const commander = require('commander')
const execSync = require('child_process').execSync
const packageJson = require('../package.json')

let projectName

const program = new commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .action(name => projectName = name)
  .option('--verbose', 'print additional logs')
  .allowUnknownOption()
  .on('--help', () => {
    console.log(`    Only ${chalk.green('<project-directory>')} is required.\n`)
  })
  .parse(process.argv)

const hiddenProgram = new commander.Command().parse(process.argv)

createApp(projectName, program.verbose)

function createApp (name, verbose) {

}

if (typeof projectName === 'undefined') {
  console.error(`Please specify the project directory:
    ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}

    For example:
    ${chalk.cyan(program.name())} ${chalk.green('my-node-app')}

    Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`)
  process.exit(1)
}

function printValidationResults (results) {
  if (typeof results !== 'undefined') {
    results.forEach(error => console.error(chalk.red(`  *  ${error}`)))
  }
}

function checkAppName (appName) {
  const validationResult = validateProjectName(appName)
  if (!validationResult.validForNewPackages) {
    console.error(`Could not create a project called ${chalk.red(`"${appName}"`)} because of npm naming restrictions:`)
    printValidationResults(validationResult.errors)
    printValidationResults(validationResult.warnings)
    process.exit(1)
  }
}

function shouldUseYarn () {
  try {
    execSync('yarnpkg --version', { stdio: 'ignore' })
    return true
  } catch (e) {
    return false
  }
}

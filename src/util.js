// @flow
const validateProjectName = require('validate-npm-package-name')
const chalk = require('chalk')
const { execSync } = require('child_process')

function printValidationResults (results) {
  if (!Array.isArray(results)) return
  results.forEach(error => console.error(chalk.red(`  *  ${error}`)))
}

function checkAppName (programName, appName) {
  if (typeof appName === 'undefined') {
    console.error(`Please specify the project directory:
      ${chalk.cyan(programName)} ${chalk.green('<project-directory>')}

      For example:
      ${chalk.cyan(programName)} ${chalk.green('my-node-app')}

      Run ${chalk.cyan(`${programName} --help`)} to see all options.`)
    process.exit(1)
  }

  const validationResult = validateProjectName(appName)
  if (!validationResult.validForNewPackages) {
    console.error(
      `Could not create a project called ${chalk.red(
        `"${appName}"`
      )} because of npm naming restrictions:`
    )
    printValidationResults(validationResult.errors)
    printValidationResults(validationResult.warnings)
    process.exit(1)
  }
}

async function shouldUseYarn () {
  try {
    await execSync('yarnpkg --version', { stdio: 'ignore' })
    return true
  } catch (e) {
    return false
  }
}

module.exports = { checkAppName, shouldUseYarn }

#!/usr/bin/env node
// @flow

const chalk = require('chalk')
const commander = require('commander')
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const packageJson = require('../package.json')

if (process.versions.node.split('.')[0] < 8) {
  console.error(
    chalk.red(`
      You are running Node ${process.versions.node}.
      create-node-app requires Node 8 or higher.
      Please update your version of Node.
    `)
  );
  process.exit(1);
}

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
  if (!Array.isArray(results)) return
  results.forEach(error => console.error(chalk.red(`  *  ${error}`)))
}


async function shouldUseYarn () {
  try {
    await exec('yarnpkg --version', { stdio: 'ignore' })
    return true
  } catch (e) {
    return false
  }
}

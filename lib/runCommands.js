const { execSync: exec } = require('child_process')

// takes an array of command strings and runs them with the cwd
// set to the target property of options
const runCommands = async (commands, options) => {
  options.log.info('running setup commands...')
  for (const command of commands) {
    options.log.info(`> ${command}`)
    exec(command, { cwd: options.target, stdio: 'inherit' })
  }
  options.log.info('done!')
}

module.exports = runCommands

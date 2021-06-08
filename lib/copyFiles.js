const { dirname, join } = require('path')
const { promisify } = require('util')
const fs = require('fs')
const mkdirp = require('mkdirp')

const copyFile = promisify(fs.copyFile)

// accepts an object where the keys are a relative path within
// the destination project and the value is the path to the source,
// creates the directories and copies files to them
const copyFiles = async (files, options) => {
  options.log.info('copying files...')
  for (const [key, value] of Object.entries(files)) {
    const dir = dirname(key)
    options.log.info(`> ${join(options.target, key)}`)
    await mkdirp(join(options.target, dir))
    await copyFile(value, join(options.target, key))
  }
  options.log.info('done!')
}

module.exports = copyFiles

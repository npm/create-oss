const { join } = require('path')
const { promisify } = require('util')
const writeFile = promisify(require('fs').writeFile)
const read = promisify(require('read'))

// accepts an object to write as a package.json, ensures all
// missing values that allow prompts are set, then writes the
// file to the target directory
// prompts are only allowed if the default for a key is an
// object with a property named 'prompt' set to 'true'
const createPackage = async (pkg, options) => {
  options.log.info('creating package.json...')
  for (const key in pkg) {
    if (pkg[key] && typeof pkg[key] === 'object' && pkg[key].prompt === true) {
      pkg[key] = await read({
        prompt: `${key}:`,
        default: pkg[key].default,
        edit: pkg[key].edit,
      })
    }
  }

  await writeFile(join(options.target, 'package.json'), JSON.stringify(pkg, null, 2))
  options.log.info('done!')
}

module.exports = createPackage

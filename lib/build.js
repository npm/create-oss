const { join } = require('path')
const fs = require('@npmcli/fs')

const validate = (defaults, options) => {
  if (!defaults || typeof defaults !== 'object') {
    throw new Error('Invalid defaults, must provide an object.')
  }

  if (!options || typeof options !== 'object') {
    throw new Error('Invalid options, must provide an object.')
  }

  if (typeof options.path !== 'string') {
    throw new Error('Invalid options, \'path\' must be a string.')
  }
}

const build = async (defaults, options) => {
  validate(defaults, options)
  const result = {}

  for (const [key, value] of Object.entries(defaults)) {
    if (typeof value === 'function') {
      result[key] = await value(key, options)
    } else {
      result[key] = value
    }
  }

  if (options.save === true) {
    const target = join(options.path, 'package.json')
    await fs.writeFile(target, JSON.stringify(result, null, 2))
  }

  return result
}

module.exports = build

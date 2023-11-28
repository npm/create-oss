const { read } = require('read')

// returns a function that will be called to prompt for a value
// options may contain anything the 'read' package accepts
// if 'default' is a function, it will be called and awaited to get a value
const prompt = (options = {}) => {
  return async (key, path) => {
    const _options = {
      prompt: `${key}:`,
      ...options,
    }

    if (typeof _options.default === 'function') {
      _options.default = await _options.default(key, path)
    }

    return read(_options)
  }
}

module.exports = prompt

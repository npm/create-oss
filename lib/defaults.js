const { basename } = require('path')

const prompt = require('./prompt.js')

const defaults = {
  name: prompt({
    default: (_, { path }) => `@npmcli/${basename(path)}`,
    edit: true,
  }),
  version: '1.0.0',
  description: prompt(),
  main: 'lib/index.js',
  keywords: ['npm', 'oss'],
}

module.exports = defaults

const t = require('tap')

const init = require('../lib/index.js')

t.test('exports all methods', async (t) => {
  t.type(init.createPackage, 'function')
  t.type(init.copyFiles, 'function')
  t.type(init.runCommands, 'function')
})

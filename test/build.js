const { join } = require('path')
const { existsSync } = require('fs')
const fs = require('fs/promises')
const t = require('tap')

const build = require('../lib/build.js')

t.test('can return an object', async (t) => {
  const path = t.testdir()
  const defaults = { foo: 'bar' }
  const options = { path }

  const result = await build(defaults, options)
  t.match(result, defaults, 'got an object')

  const target = join(path, 'package.json')
  const fileExists = existsSync(target)
  t.not(fileExists, 'file was not written')
})

t.test('can save the package.json', async (t) => {
  const path = t.testdir()
  const defaults = { foo: 'bar' }
  const options = { path, save: true }

  const result = await build(defaults, options)
  t.match(result, defaults, 'got an object')

  const target = join(path, 'package.json')
  const fileExists = existsSync(target)
  t.ok(fileExists, 'file was written')

  const contents = await fs.readFile(target)
  const parsed = JSON.parse(contents)
  t.match(parsed, defaults, 'wrote contents to disk')
})

t.test('errors for no params', async (t) => {
  await t.rejects(build(), {
    message: 'Invalid defaults',
  })
})

t.test('errors for invalid defaults', async (t) => {
  await t.rejects(build('foo'), {
    message: 'Invalid defaults',
  })
})

t.test('errors for no options', async (t) => {
  const defaults = {}
  await t.rejects(build(defaults), {
    message: 'Invalid options',
  })
})

t.test('errors for invalid options', async (t) => {
  const defaults = {}
  await t.rejects(build(defaults, 'foo'), {
    message: 'Invalid options',
  })
})

t.test('errors for missing path option', async (t) => {
  const defaults = {}
  const options = {}
  await t.rejects(build(defaults, options), {
    message: 'Invalid options',
  })
})

t.test('errors for invalid path option', async (t) => {
  const defaults = {}
  const options = { path: false }
  await t.rejects(build(defaults, options), {
    message: 'Invalid options',
  })
})

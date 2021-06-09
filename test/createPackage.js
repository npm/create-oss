const { join } = require('path')
const { promisify } = require('util')
const fs = require('fs')
const t = require('tap')

const readFile = promisify(fs.readFile)

const log = {
  output: [],
  info: (arg) => log.output.push(arg),
}
t.beforeEach(() => log.output.length = 0)

t.test('creates a package.json', async (t) => {
  const readOptions = []
  const read = (opts, cb) => {
    readOptions.push(opts)
    if (opts.prompt.startsWith('name'))
      return cb(null, 'test-pkg')

    if (opts.prompt.startsWith('description'))
      return cb(null, 'just a test')
  }

  const createPackage = t.mock('../lib/createPackage.js', {
    read,
  })

  const target = t.testdir()
  const defaults = {
    name: {
      prompt: true,
      default: 'test-pkg',
      edit: true,
    },
    description: {
      prompt: true,
    },
    version: '1.0.0',
    keywords: ['one', 'two'],
  }

  await createPackage(defaults, { target, log })

  t.equal(readOptions.length, 2, 'called read twice')
  t.same(readOptions[0], {
    prompt: 'name:',
    default: 'test-pkg',
    edit: true,
  }, 'prompted for name')
  t.same(readOptions[1], {
    prompt: 'description:',
    default: undefined,
    edit: undefined,
  }, 'prompted for description')

  const pkg = JSON.parse(await readFile(join(target, 'package.json')))
  t.same(pkg, {
    name: 'test-pkg',
    description: 'just a test',
    version: '1.0.0',
    keywords: ['one', 'two'],
  }, 'wrote the correct contents')

  t.same(log.output, [
    'creating package.json...',
    'done!',
  ], 'logged correct entries')
})

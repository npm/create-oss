const t = require('tap')

const { parseArgs } = require('../lib/options.js')

t.test('parses arguments', async (t) => {
  const args = [
    '--name=foo',
    '--keywords=npm',
    '--keywords=test',
    '--nonsense=ignore',
    '--scripts=ignore',
  ]
  const defaults = {
    name: {
      prompt: true,
    },
    description: {
      prompt: true,
    },
    version: '1.0.0',
    keywords: [],
    scripts: {
      foo: 'test-foo',
    },
  }

  const result = parseArgs(args, defaults)
  t.same(result, {
    name: 'foo',
    description: {
      prompt: true,
    },
    version: '1.0.0',
    keywords: ['npm', 'test'],
    scripts: {
      foo: 'test-foo',
    },
  }, 'parsed and applied options correctly')
})

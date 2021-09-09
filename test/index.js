const { basename } = require('path')
const sinon = require('sinon')
const t = require('tap')

const read = sinon.stub()
const pkg = t.mock('..', { read })

t.afterEach(() => {
  read.reset()
})

t.test('can generate a package.json', async (t) => {
  const path = t.testdir()
  const defaultName = `@npmcli/${basename(path)}`
  const description = 'just a description'

  const namePrompt = read.withArgs(sinon.match({
    prompt: 'name:',
    default: defaultName,
    edit: true,
  })).yields(null, defaultName)

  const descPrompt = read.withArgs(sinon.match({
    prompt: 'description:',
  })).yields(null, description)

  const result = await pkg.build(pkg.defaults, { path })

  t.match(result, {
    name: defaultName,
    description: description,
    version: pkg.defaults.version,
    keywords: pkg.defaults.keywords,
    main: pkg.defaults.main,
  })
  t.ok(namePrompt.called, 'prompted for name')
  t.ok(descPrompt.called, 'prompted for description')
})

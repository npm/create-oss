const sinon = require('sinon')
const t = require('tap')

const read = sinon.stub().resolves()
const prompt = t.mock('../lib/prompt.js', { read })

t.afterEach(() => {
  read.reset()
})

t.test('can provide custom prompt', async (t) => {
  const response = 'yes'
  const mock = read.withArgs(sinon.match({
    prompt: 'supports custom prompts:',
  })).resolves(response)

  const promptFn = prompt({
    prompt: 'supports custom prompts:',
  })

  const result = await promptFn('IGNORED', '/')
  t.equal(result, response)
  t.ok(mock.called)
})

t.test('can provide default as a value', async (t) => {
  const response = 'default'
  const mock = read.withArgs(sinon.match({
    prompt: 'value:',
    default: response,
  })).resolves(response)

  const promptFn = prompt({
    default: response,
  })

  const result = await promptFn('value', '/')
  t.equal(result, response)
  t.ok(mock.called)
})

t.test('can provide default as a function', async (t) => {
  const response = 'default'
  const defaultFn = sinon.stub().returns(response)
  const mock = read.withArgs(sinon.match({
    prompt: 'value:',
    default: response,
  })).resolves(response)

  const promptFn = prompt({
    default: defaultFn,
  })

  const result = await promptFn('value', '/')
  t.equal(result, response)
  t.ok(mock.called)
  t.ok(defaultFn.calledWith('value', '/'), 'passed parameters to default fn')
})

const t = require('tap')

const log = {
  output: [],
  info: (arg) => log.output.push(arg),
}
t.beforeEach(() => log.output.length = 0)

t.test('can run commands', async (t) => {
  const execCalls = []
  const runCommands = t.mock('../lib/runCommands.js', {
    child_process: {
      execSync: (cmd, opts) => {
        execCalls.push({ cmd, opts })
      },
    },
  })
  const target = t.testdir()
  const commands = [
    'npm i foo',
    'npm run bar',
  ]

  await runCommands(commands, { target, log })
  t.equal(execCalls.length, 2, 'ran both commands')
  t.same(execCalls[0], {
    cmd: commands[0],
    opts: {
      cwd: target,
      stdio: 'inherit',
    },
  }, 'ran first command with correct params')
  t.same(execCalls[1], {
    cmd: commands[1],
    opts: {
      cwd: target,
      stdio: 'inherit',
    },
  }, 'ran second command with correct params')

  t.same(log.output, [
    'running setup commands...',
    `> ${commands[0]}`,
    `> ${commands[1]}`,
    'done!',
  ], 'logged correct messages')
})

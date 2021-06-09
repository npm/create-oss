const { promisify } = require('util')
const { join } = require('path')
const fs = require('fs')
const t = require('tap')

const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)

const copyFiles = require('../lib/copyFiles.js')

const log = {
  output: [],
  info: (arg) => log.output.push(arg),
}
t.beforeEach(() => log.output.length = 0)

const topTxt = 'a file that goes in the root'
const nestedTxt = 'a file that goes in a directory that does not exist'
const src = t.testdir({
  'top.txt': topTxt,
  'nested.txt': nestedTxt,
})

t.test('copies files', async (t) => {
  const target = t.testdir()
  const files = {
    'top.txt': join(src, 'top.txt'),
    'dir/nested.txt': join(src, 'nested.txt'),
  }

  await copyFiles(files, {
    target,
    log,
  })

  const topContents = await readdir(target)
  t.same(topContents, ['dir', 'top.txt'], 'has expected top level file and dir')
  const foundTopTxt = await readFile(join(target, 'top.txt'), { encoding: 'utf8' })
  t.equal(foundTopTxt, topTxt, 'wrote correct top.txt')
  const nestedContents = await readdir(join(target, 'dir'))
  t.same(nestedContents, ['nested.txt'], 'has expected nested dir files')
  const foundNestedTxt = await readFile(join(target, 'dir', 'nested.txt'), { encoding: 'utf8' })
  t.equal(foundNestedTxt, nestedTxt, 'wrote correct dir/nested.txt')
  t.same(log.output, [
    'copying files...',
    `> ${join(target, 'top.txt')}`,
    `> ${join(target, 'dir', 'nested.txt')}`,
    'done!',
  ], 'logged the correct information')
})

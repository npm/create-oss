#!/usr/bin/env node

const main = async (readOpts) => {

  const tc = (fn, def) => { try { return fn() } catch (e) { return def || '' } }
  const fs = require('fs')
  const pkg = tc(() => JSON.parse(fs.readFileSync('package.json')), {})
  const gitConfig = (k, v) => v ? setGitConfig(k, v) : getGitConfig(k)
  const setGitConfig = (k, v) =>
    sh(`git config --global --add ${JSON.stringify(k)} ${JSON.stringify(v)}`)
  const getGitConfig = k => sh(`git config --get-all ${k}`)
  const {execSync} = require('child_process')
  const sh = (cmd, opt) => (execSync(cmd, opt) || '').toString().trim()
  const gitFullname = gitConfig('user.fullname')
  const myName = gitFullname || await read('What is your full name? ')
  if (!gitFullname)
    gitConfig('user.fullname', myName)
  const gitEmail = gitConfig('user.email')
  const email = gitEmail || await read('What is your email address? ')
  if (!gitEmail)
    gitConfig('user.email', email)

  fs.writeFileSync('package.json', fs.readFileSync('package-template.json'))
})

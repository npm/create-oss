#!/usr/bin/env node

const {
  defaults,
  build,
} = require('..')

const main = async () => {
  await build(defaults, {
    path: process.cwd(),
    save: true,
  })

  console.log('package.json created! to complete setup run `npm i -D @npmcli/template-oss`')
}

main().catch((err) => {
  console.error(err.stack)
  process.exitCode = 1
})

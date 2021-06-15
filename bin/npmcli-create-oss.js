#!/usr/bin/env node
const { basename, resolve } = require('path')
const { parseArgs } = require('../lib/options.js')
const init = require('../lib/index.js')

const main = async (argv) => {
  const defaultOpts = {
    target: process.cwd(),
  }
  // we only want to allow the target to be set
  const options = {
    ...parseArgs(argv, defaultOpts),
    log: console,
  }
  options.target = resolve(options.target)

  // defaults for package.json
  const defaultPkg = {
    name: {
      prompt: true,
      default: `@npmcli/${basename(options.target)}`,
      edit: true,
    },
    version: '1.0.0',
    description: {
      prompt: true,
    },
    main: 'lib/index.js',
    files: ['lib', 'bin'],
    scripts: {
      preversion: 'npm test',
      postversion: 'npm publish',
      prepublishOnly: 'git push origin --follow-tags',
      snap: 'tap',
      test: 'tap',
    },
    keywords: ['npm', 'oss'],
    author: 'GitHub Inc.',
    license: 'ISC',
  }
  const pkg = parseArgs(argv, defaultPkg)

  // files to copy
  const files = {
    'LICENSE.md': resolve(__dirname, '..', 'files', 'LICENSE.md'),
    '.github/workflows/ci.yml': resolve(__dirname, '..', 'files', 'ci.yml'),
    '.gitignore': resolve(__dirname, '..', 'files', 'gitignore'),
  }

  // commands to run
  const commands = [
    'npm i -D tap@latest --loglevel=error',
    'npm exec --yes --package @npmcli/lint@latest -c npmcli-lint-init --loglevel=error',
  ]

  await init.createPackage(pkg, options)
  await init.copyFiles(files, options)
  await init.runCommands(commands, options)
}

main(process.argv.slice(2)).catch((err) => {
  console.error(err.stack)
  process.exitCode = 1
})

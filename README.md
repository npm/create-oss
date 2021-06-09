# `@npmcli/create-oss`

This is a module designed to be consumed with `npm init @npmcli/oss`.

It creates a `package.json`, copies files, and runs commands in order
to start a brand new project. It does not function in an idempotent way
(yet) so should not be used on an existing project.

## Usage

```
> mkdir foo
> cd foo
> npm init @npmcli/oss
```

If you wish to initialize a directory other than your current working
directory, you can use the `--target=/some/other/path` argument like so:

```
> mkdir foo
> npm init @npmcli/oss --target=./foo`
```

### `package.json`

The default `package.json` looks like the following:

```
{
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
  author: 'npm Inc. <support@npmjs.com>',
  license: 'ISC',
}
```

The properties whose values are objects with a `prompt` property set to `true`
will prompt the user for input unless invoking this script with an argument
that defines them, such as `--name=@npmcli/foo`. All fields defined in the
default, except for `scripts`, can be overridden using arguments in this way.

### Files copied

All files that are intended to be copied to the newly created project are
found in the `files` directory of this repository. They are:

- `files/LICENSE.md` -> `LICENSE.md`
- `files/ci.yml`     -> `.github/workflows/ci.yml`
- `files/gitignore`  -> `.gitignore`

### Commands run

After creating the `package.json` and copying files to the repository, the
following commands are run:

- `npm i -D tap@latest --loglevel=error`
- `npm exec --yes --package @npmcli/lint@latest -c npmcli-lint-init --loglevel=error`


## Making changes

The defaults for `package.json`, the definition of files to be copied, as well
as the commands to be run are currently defined in `bin/npmcli-create-oss.js`.

### `package.json`

To add a new field to the `package.json` with a default value, you can simply
add the field with its value set to the default in the `defaultPkg` object.

#### Prompting

By defining a property in `defaultPkg` as an object with a property named
`prompt` set to `true`, the consumer will be prompted for a value for that
field unless they specify it using an argument.

```
description: {
  prompt: true,
}
```

You may provide a default value for prompts by adding a `default` property
to this object.

```
description: {
  prompt: true,
  default: 'just some package',
}
```

This will result in a prompt being displayed with a default value that the
user may select by pressing the `enter` key. If they wish to use a value
other than the default they will be required to type it themselves.

If you want to provide a default that the user can edit, rather than requiring
that they fully type a new value, add an `edit` property set to `true`.

```
description: {
  prompt: true,
  default: 'just some package',
  edit: true,
}
```

### Files to copy

To copy an additional file, add a property to the `files` object whose key is
the destination for the file relative to the `target` (the current working
directory by default) and whose value is the path to the source file.

### Running commands

To run an additional command, append it to the `commands` array as a string.
All commands here will be run in the `target` directory _after_ the
`package.json` has been created and files have been copied.

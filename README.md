# `@npmcli/create-oss`

This is a module designed to be consumed with `npm init @npmcli/oss`.

It creates a `package.json` containing some default fields for the npm CLI team.

## Usage

```
> mkdir foo
> cd foo
> npm init @npmcli/oss
```

### `package.json`

The default `package.json` is defined in `lib/defaults.js` and looks like the following:

```
const prompt = require('./prompt.js')
const defaults = {
  name: prompt({
    default: (_, { path }) => `@npmcli/${basename(path)}`,
    edit: true,
  }),
  version: '1.0.0',
  description: prompt(),
  main: 'lib/index.js',
  keywords: ['npm', 'oss'],
}
```

#### Prompting

The `prompt` function accepts any options allowed by [read](https://github.com/npm/read#readme)
with a few minor tweaks.

If a `prompt` option is not specified, it will default to the name of the field being prompted for.
As an example, in the above defaults the prompt for the description field will be `description:`.

The `default` option may be set to a value, or a function. If a function is used, it will be called
with the name of the property and the options object. The result is awaited, so async functions can
be used as well as sync.

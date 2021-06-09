// accept an argv array and a defaults object,
// parse the argv for key=value segments,
// uses the defaults to determine the keys the
// final object should have and applies values
// as either the result of the parsed argv or
// the default for that key
const parseArgs = (argv, defaults) => {
  const parsed = {}

  const args = argv.reduce((acc, arg) => {
    const [rawKey, val] = arg.split('=').map(segment => segment.trim())
    const key = rawKey.slice(rawKey.lastIndexOf('-') + 1)
    // if the default for this value is an object and does
    // not have a prompt setting allowed, we just ignore it
    // for now and copy the defaults later
    if (defaults[key] && !Array.isArray(defaults[key]) && (!Object.prototype.hasOwnProperty.call(defaults[key], 'prompt') || defaults[key].prompt !== true))
      return acc

    // defaults that are arrays should be arrays when parsing too
    if (defaults[key] && Array.isArray(defaults[key]))
      acc[key] = Array.isArray(acc[key]) ? acc[key].concat(val) : [val]
    else
      // everything else is just copied as-is
      acc[key] = val

    return acc
  }, {})

  // copy any remaining unset fields from the defaults
  for (const key in defaults) {
    if (Object.prototype.hasOwnProperty.call(args, key))
      parsed[key] = args[key]
    else
      parsed[key] = defaults[key]
  }

  return parsed
}

module.exports = {
  parseArgs,
}

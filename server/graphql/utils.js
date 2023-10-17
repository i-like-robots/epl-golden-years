import { GraphQLError } from 'graphql'

export function arrayToEnum(arr) {
  return arr.reduce((acc, item) => ({ ...acc, [item]: { value: item } }), {})
}

export function validateArg(arg, pattern, name) {
  if (new RegExp(pattern).test(arg)) {
    return true
  } else {
    throw new GraphQLError('Argument validation error', {
      extensions: {
        code: 'INVALID_ARGUMENT',
        message: `"${name}" does not match pattern ${pattern}`,
      },
    })
  }
}

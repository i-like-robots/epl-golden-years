import { GraphQLNonNull, GraphQLString } from 'graphql'

export default function createRelationship(schema, model) {
  const name = schema.name.toLowerCase()
  const id = `${name}Id`

  return {
    [id]: {
      type: new GraphQLNonNull(GraphQLString),
    },
    [name]: {
      type: new GraphQLNonNull(schema),
      resolve: (source) => ({ [id]: source[id], ...model(source[id]) }),
    },
  }
}

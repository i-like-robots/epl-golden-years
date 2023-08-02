const { GraphQLNonNull, GraphQLString } = require('graphql')

module.exports = function createRelationship(schema, model) {
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

const { GraphQLObjectType, GraphQLSchema } = require('graphql')
const { managerQuery } = require('./manager')

const rootQuery = new GraphQLObjectType({
  name: 'Root',
  fields: () => ({
    ...managerQuery,
  }),
})

const schema = new GraphQLSchema({
  query: rootQuery,
})

module.exports = { schema }

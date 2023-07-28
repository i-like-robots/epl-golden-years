const { GraphQLObjectType, GraphQLSchema } = require('graphql')
const { managerQuery } = require('./manager')
const { managersQuery } = require('./managersQuery')

const rootQuery = new GraphQLObjectType({
  name: 'Root',
  fields: () => ({
    ...managerQuery,
    ...managersQuery,
  }),
})

const schema = new GraphQLSchema({
  query: rootQuery,
})

module.exports = { schema }

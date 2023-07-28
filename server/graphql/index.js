const { GraphQLObjectType, GraphQLSchema } = require('graphql')
const { managerQuery } = require('./manager')
const { managersQuery } = require('./managersQuery')
const { playerAlbumQuery } = require('./playerAlbumQuery')

const rootQuery = new GraphQLObjectType({
  name: 'Root',
  fields: {
    ...managerQuery,
    ...managersQuery,
    ...playerAlbumQuery,
  },
})

const schema = new GraphQLSchema({
  query: rootQuery,
})

module.exports = { schema }

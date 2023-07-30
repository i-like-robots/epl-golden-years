const { GraphQLObjectType, GraphQLSchema } = require('graphql')
const { managerQuery } = require('./managerQuery')
const { managersQuery } = require('./managersQuery')
const { playerAlbumQuery } = require('./playerAlbumQuery')
const { playerQuery } = require('./playerQuery')

const rootQuery = new GraphQLObjectType({
  name: 'Root',
  fields: {
    ...managerQuery,
    ...managersQuery,
    ...playerAlbumQuery,
    ...playerQuery,
  },
})

const schema = new GraphQLSchema({
  query: rootQuery,
})

module.exports = { schema }

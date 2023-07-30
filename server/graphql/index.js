const { GraphQLObjectType, GraphQLSchema } = require('graphql')
const { managerQuery } = require('./manager')
const { managersQuery } = require('./managersQuery')
const { playerAlbumQuery } = require('./playerAlbumQuery')
const { playerHistoryQuery } = require('./playerHistoryQuery')
const { playerQuery } = require('./playerQuery')

const rootQuery = new GraphQLObjectType({
  name: 'Root',
  fields: {
    ...managerQuery,
    ...managersQuery,
    ...playerAlbumQuery,
    ...playerHistoryQuery,
    ...playerQuery,
  },
})

const schema = new GraphQLSchema({
  query: rootQuery,
})

module.exports = { schema }

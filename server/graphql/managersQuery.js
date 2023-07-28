const { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } = require('graphql')
const managersModel = require('../models/managersModel')

const managersType = new GraphQLObjectType({
  name: 'Managers',
  fields: () => ({
    managerId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (source) => source,
    },
  }),
})

const managersQuery = {
  managers: {
    type: new GraphQLList(managersType),
    args: {
      name: {
        type: GraphQLString,
      },
    },
    resolve: (_, args) => {
      return managersModel({ ...args })
    },
  },
}

module.exports = { managersType, managersQuery }

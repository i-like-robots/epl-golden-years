const {
  GraphQLError,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql')
const { PLAYER_ID } = require('../lib/constants')
const managerModel = require('../models/managerModel')

const managerHistoryType = new GraphQLObjectType({
  name: 'ManagerHistory',
  fields: () => ({
    seasonId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    teamId: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
})

const managerType = new GraphQLObjectType({
  name: 'Manager',
  fields: () => ({
    pulseId: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    optaId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    displayName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    dateOfBirth: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'ISO 8601 date, e.g. 1954-05-10',
    },
    countryCode: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'ISO-3166-1 code, e.g. GB-ENG',
    },
    countryName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    history: {
      type: new GraphQLList(managerHistoryType),
    },
  }),
})

const managerQuery = {
  manager: {
    type: managerType,
    args: {
      managerId: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: (_, args) => {
      if (new RegExp(PLAYER_ID).test(args.managerId)) {
        return managerModel(args.managerId)
      } else {
        throw new GraphQLError('Argument validation error', {
          extensions: {
            code: 'INVALID_ARGUMENT',
            message: `"managerId" does not match pattern ${PLAYER_ID}`,
          },
        })
      }
    },
  },
}

module.exports = { managerHistoryType, managerType, managerQuery }

const { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } = require('graphql')
const { PLAYER_ID } = require('../lib/constants')
const playerHistoryModel = require('../models/playerHistoryModel')
const { validateArg } = require('./utils')

const playerHistoryType = new GraphQLObjectType({
  name: 'PlayerHistory',
  fields: {
    teamId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    seasonId: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
})

const playerHistoryQuery = {
  playerHistory: {
    type: new GraphQLList(playerHistoryType),
    args: {
      playerId: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: (_, args) => {
      if (validateArg(args.playerId, PLAYER_ID, 'playerId')) {
        return playerHistoryModel(args.playerId)
      }
    },
  },
}

module.exports = { playerHistoryType, playerHistoryQuery }

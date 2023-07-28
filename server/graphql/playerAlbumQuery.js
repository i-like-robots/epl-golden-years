const {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql')
const { PLAYER_ID } = require('../lib/constants')
const playerAlbumModel = require('../models/playerAlbumModel')
const { validateArg } = require('./utils')

const playerAlbumType = new GraphQLObjectType({
  name: 'PlayerAlbum',
  fields: {
    teamId: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    seasonId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    sticker: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
})

const playerAlbumQuery = {
  playerAlbum: {
    type: new GraphQLList(playerAlbumType),
    args: {
      playerId: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: (_, args) => {
      if (validateArg(args.playerId, PLAYER_ID, 'playerId')) {
        return playerAlbumModel(args.playerId)
      }
    },
  },
}

module.exports = { playerAlbumType, playerAlbumQuery }

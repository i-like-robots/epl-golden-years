const {
  GraphQLEnumType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql')
const { validateArg, arrayToEnum } = require('./utils')
const { PLAYER_ID, POSITION_CODES, POSITION_NAMES } = require('../lib/constants')
const playerModel = require('../models/playerModel')
const playerAlbumModel = require('../models/playerAlbumModel')
const playerHistoryModel = require('../models/playerHistoryModel')

const positionCodeType = new GraphQLEnumType({
  name: 'PositionCode',
  values: arrayToEnum(POSITION_CODES),
})

const positionNameType = new GraphQLEnumType({
  name: 'PositionName',
  values: arrayToEnum(POSITION_NAMES),
})

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

const playerAlbumType = new GraphQLObjectType({
  name: 'PlayerAlbum',
  fields: {
    teamId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    seasonId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    sticker: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
})

const playerType = new GraphQLObjectType({
  name: 'Player',
  fields: {
    pulseId: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    optaId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    positionCode: {
      type: new GraphQLNonNull(positionCodeType),
    },
    positionName: {
      type: new GraphQLNonNull(positionNameType),
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
      type: new GraphQLList(playerHistoryType),
      resolve: (source) => playerHistoryModel(source.playerId),
    },
    album: {
      type: new GraphQLList(playerAlbumType),
      resolve: (source) => playerAlbumModel(source.playerId),
    }
  },
})

const playerQuery = {
  player: {
    type: playerType,
    args: {
      playerId: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: (_, { playerId }) => {
      if (validateArg(playerId, PLAYER_ID, 'playerId')) {
        return { playerId, ...playerModel(playerId) }
      }
    },
  },
}

module.exports = { playerType, playerQuery }

const {
  GraphQLEnumType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql')
const { validateArg } = require('./utils')
const { PLAYER_ID, PLAYER_POSITIONS, POSITION_NAMES } = require('../lib/constants')
const { playerHistoryType } = require('./playerHistoryQuery')
const playerModel = require('../models/playerModel')
const playerHistoryModel = require('../models/playerHistoryModel')

const positionCodeType = new GraphQLEnumType({
  name: 'PositionCode',
  values: PLAYER_POSITIONS.reduce((acc, code) => ({ ...acc, [code]: { value: code } }), {}),
})

const positionNameType = new GraphQLEnumType({
  name: 'PositionName',
  values: POSITION_NAMES.reduce((acc, code) => ({ ...acc, [code]: { value: code } }), {}),
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

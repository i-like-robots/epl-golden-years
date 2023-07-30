const {
  GraphQLEnumType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require('graphql')
const { POSITION_CODES, POSITION_NAMES, PLAYER_ID } = require('../lib/constants')
const { arrayToEnum, validateArg } = require('./utils')
const managerModel = require('../models/managerModel')
const managersModel = require('../models/managersModel')
const playerAlbumModel = require('../models/playerAlbumModel')
const playerHistoryModel = require('../models/playerHistoryModel')
const playerModel = require('../models/playerModel')
const playersModel = require('../models/playersModel')
const playerStatsHistoryModel = require('../models/playerStatsHistoryModel')
const playerStatsModel = require('../models/playerStatsModel')

const historyType = new GraphQLObjectType({
  name: 'History',
  fields: {
    seasonId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    teamId: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
})

const managerType = new GraphQLObjectType({
  name: 'Manager',
  fields: {
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
      type: new GraphQLList(historyType),
    },
  },
})

const managersType = new GraphQLObjectType({
  name: 'Managers',
  fields: {
    managerId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (source) => source,
    },
  },
})

const positionCodeType = new GraphQLEnumType({
  name: 'PositionCode',
  values: arrayToEnum(POSITION_CODES),
})

const positionNameType = new GraphQLEnumType({
  name: 'PositionName',
  values: arrayToEnum(POSITION_NAMES),
})

const albumType = new GraphQLObjectType({
  name: 'Album',
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

const playerStatsTotalType = new GraphQLObjectType({
  name: 'PlayerStatsTotal',
  fields: {
    appearances: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    cleanSheets: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    goals: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    assists: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    hatTricks: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
})

const playerStatsHistoryType = new GraphQLObjectType({
  name: 'PlayerStatsHistory',
  fields: {
    seasonId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    appearances: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    cleanSheets: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    goals: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    assists: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    hatTricks: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
})

const playerStatsType = new GraphQLObjectType({
  name: 'PlayerStats',
  fields: {
    total: {
      type: new GraphQLNonNull(playerStatsTotalType),
      resolve: (playerId) => playerStatsModel(playerId),
    },
    history: {
      type: new GraphQLList(playerStatsHistoryType),
      resolve: (playerId) => playerStatsHistoryModel(playerId),
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
      type: new GraphQLList(historyType),
      resolve: (source) => playerHistoryModel(source.playerId),
    },
    album: {
      type: new GraphQLList(albumType),
      resolve: (source) => playerAlbumModel(source.playerId),
    },
    stats: {
      type: new GraphQLNonNull(playerStatsType),
      resolve: (source) => source.playerId,
    },
  },
})

const playersType = new GraphQLObjectType({
  name: 'Players',
  fields: {
    playerId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (source) => source,
    },
  },
})

const rootQuery = new GraphQLObjectType({
  name: 'Root',
  fields: {
    manager: {
      type: managerType,
      args: {
        managerId: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (_, { managerId }) => {
        if (validateArg(managerId, PLAYER_ID, 'managerId')) {
          return { managerId, ...managerModel(managerId) }
        }
      },
    },
    managers: {
      type: new GraphQLList(managersType),
      args: {
        name: {
          type: GraphQLString,
        },
      },
      resolve: (_, { name }) => {
        return managersModel({ name })
      },
    },
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
    players: {
      type: new GraphQLList(playersType),
      args: {
        name: {
          type: GraphQLString,
        },
        position: {
          type: positionCodeType,
        },
      },
      resolve: (_, { name, position }) => {
        return playersModel({ name, position })
      },
    },
  },
})

const schema = new GraphQLSchema({
  query: rootQuery,
})

module.exports = schema

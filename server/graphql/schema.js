const {
  GraphQLEnumType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require('graphql')
const { POSITION_CODES, POSITION_NAMES, PLAYER_ID, SEASON_ID } = require('../lib/constants')
const { arrayToEnum, validateArg } = require('./utils')
const managerModel = require('../models/managerModel')
const managersModel = require('../models/managersModel')
const playerAlbumModel = require('../models/playerAlbumModel')
const playerHistoryModel = require('../models/playerHistoryModel')
const playerModel = require('../models/playerModel')
const playersModel = require('../models/playersModel')
const playerStatsHistoryModel = require('../models/playerStatsHistoryModel')
const playerStatsModel = require('../models/playerStatsModel')
const seasonHatTricksModel = require('../models/seasonHatTricksModel')
const seasonModel = require('../models/seasonModel')
const seasonTableModel = require('../models/seasonTableModel')
const seasonTopAssistsModel = require('../models/seasonTopAssistsModel')
const seasonTopCleanSheetsModel = require('../models/seasonTopCleanSheetsModel')
const seasonTopScorersModel = require('../models/seasonTopScorersModel')
const seasonsModel = require('../models/seasonsModel')

const historyType = new GraphQLObjectType({
  name: 'History',
  fields: () => ({
    seasonId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    season: {
      type: new GraphQLNonNull(seasonType),
      resolve: ({ seasonId }) => seasonModel(seasonId),
    },
    teamId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    // team: {
    //   type: new GraphQLNonNull(teamType),
    // resolver: (source) => {},
    // },
  }),
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
      resolve: (managerId) => managerId,
    },
    manager: {
      type: new GraphQLNonNull(managerType),
      resolve: (managerId) => ({ managerId, ...managerModel(managerId) }),
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
  fields: () => ({
    seasonId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    season: {
      type: new GraphQLNonNull(seasonType),
      resolve: ({ seasonId }) => seasonModel(seasonId),
    },
    teamId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    // team: {
    //   type: new GraphQLNonNull(teamType),
    // resolver: (source) => {},
    // },
    sticker: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
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
  fields: () => ({
    seasonId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    season: {
      type: new GraphQLNonNull(seasonType),
      resolve: ({ seasonId }) => seasonModel(seasonId),
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
  }),
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
      resolve: ({ playerId }) => playerHistoryModel(playerId),
    },
    album: {
      type: new GraphQLList(albumType),
      resolve: ({ playerId }) => playerAlbumModel(playerId),
    },
    stats: {
      type: new GraphQLNonNull(playerStatsType),
      resolve: ({ playerId }) => playerId,
    },
  },
})

const playersType = new GraphQLObjectType({
  name: 'Players',
  fields: {
    playerId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (playerId) => playerId,
    },
    player: {
      type: new GraphQLNonNull(playerType),
      resolve: (playerId) => ({ playerId, ...playerModel(playerId) }),
    },
  },
})

const seasonHatTricksType = new GraphQLObjectType({
  name: 'SeasonHatTricks',
  fields: {
    playerId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    player: {
      type: new GraphQLNonNull(playerType),
      resolve: ({ playerId }) => ({ playerId, ...playerModel(playerId) }),
    },
    homeTeamId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    // homeTeam: {
    //   type: new GraphQLNonNull(teamType),
    // resolver: (source) => {},
    // },
    awayTeamId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    // awayTeam: {
    //   type: new GraphQLNonNull(teamType),
    // resolver: (source) => {},
    // },
    date: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'ISO 8601 date, e.g. 1954-05-10',
    },
  },
})

const seasonTableType = new GraphQLObjectType({
  name: 'SeasonTable',
  fields: {
    teamId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    // team: {
    //   type: new GraphQLNonNull(teamType),
    // resolver: (source) => {},
    // },
    rank: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    points: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    played: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    wins: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    draws: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    losses: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    for: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    against: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    diff: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
})

const seasonTopAssistsType = new GraphQLObjectType({
  name: 'SeasonTopAssists',
  fields: {
    playerId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    player: {
      type: new GraphQLNonNull(playerType),
      resolve: ({ playerId }) => ({ playerId, ...playerModel(playerId) }),
    },
    assists: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    appearances: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    minutesPerAssist: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
})

const seasonTopCleanSheetsType = new GraphQLObjectType({
  name: 'SeasonTopCleanSheets',
  fields: {
    playerId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    player: {
      type: new GraphQLNonNull(playerType),
      resolve: ({ playerId }) => ({ playerId, ...playerModel(playerId) }),
    },
    cleanSheets: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    appearances: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
})

const seasonTopScorersType = new GraphQLObjectType({
  name: 'SeasonTopScorers',
  fields: {
    playerId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    player: {
      type: new GraphQLNonNull(playerType),
      resolve: ({ playerId }) => ({ playerId, ...playerModel(playerId) }),
    },
    goals: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    appearances: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    minutesPerGoal: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
})

const seasonType = new GraphQLObjectType({
  name: 'Season',
  fields: {
    displayName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    shortName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    sponsor: {
      type: new GraphQLNonNull(GraphQLString),
    },
    ball: {
      type: new GraphQLNonNull(GraphQLString),
    },
    start: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'ISO 8601 date, e.g. 1954-05-10',
    },
    end: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'ISO 8601 date, e.g. 1954-05-10',
    },
    hatTricks: {
      type: new GraphQLList(seasonHatTricksType),
      resolve: ({ seasonId }) => seasonHatTricksModel(seasonId),
    },
    table: {
      type: new GraphQLList(seasonTableType),
      resolve: ({ seasonId }) => seasonTableModel(seasonId),
    },
    topAssists: {
      type: new GraphQLList(seasonTopAssistsType),
      resolve: ({ seasonId }) => seasonTopAssistsModel(seasonId),
    },
    topCleanSheets: {
      type: new GraphQLList(seasonTopCleanSheetsType),
      resolve: ({ seasonId }) => seasonTopCleanSheetsModel(seasonId),
    },
    topScorers: {
      type: new GraphQLList(seasonTopScorersType),
      resolve: ({ seasonId }) => seasonTopScorersModel(seasonId),
    },
  },
})

const seasonsType = new GraphQLObjectType({
  name: 'Seasons',
  fields: {
    seasonId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (seasonId) => seasonId,
    },
    season: {
      type: new GraphQLNonNull(seasonType),
      resolve: (seasonId) => ({ seasonId, ...seasonModel(seasonId) }),
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
    season: {
      type: seasonType,
      args: {
        seasonId: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (_, { seasonId }) => {
        if (validateArg(seasonId, SEASON_ID, 'seasonId')) {
          return { seasonId, ...seasonModel(seasonId) }
        }
      },
    },
    seasons: {
      type: new GraphQLList(seasonsType),
      args: {
        team: {
          type: GraphQLString,
        },
      },
      resolve: (_, { team }) => {
        return seasonsModel({ team })
      },
    },
  },
})

const schema = new GraphQLSchema({
  query: rootQuery,
})

module.exports = schema

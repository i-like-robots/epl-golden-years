const {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require('graphql')
const { PERSON_ID, SEASON_ID, TEAM_ID } = require('../lib/constants')
const { validateArg } = require('./utils')
const { PositionCodeType, PositionNameType } = require('./enums')
const createRelationship = require('./relationship')
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
const seasonsModel = require('../models/seasonsModel')
const seasonTableModel = require('../models/seasonTableModel')
const seasonTopAssistsModel = require('../models/seasonTopAssistsModel')
const seasonTopCleanSheetsModel = require('../models/seasonTopCleanSheetsModel')
const seasonTopScorersModel = require('../models/seasonTopScorersModel')
const teamModel = require('../models/teamModel')
const teamSeasonsModel = require('../models/teamSeasonsModel')
const teamSquadManagersModel = require('../models/teamSquadManagersModel')
const teamSquadModel = require('../models/teamSquadModel')
const teamSquadsModel = require('../models/teamSquadsModel')
const teamStatsHistoryModel = require('../models/teamStatsHistoryModel')
const teamsModel = require('../models/teamsModel')
const teamStatsModel = require('../models/teamStatsModel')

const managerHistoryType = new GraphQLObjectType({
  name: 'ManagerHistory',
  fields: () => ({
    ...createRelationship(seasonType, seasonModel),
    ...createRelationship(teamType, teamModel),
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

const managersType = new GraphQLObjectType({
  name: 'Managers',
  fields: () => ({
    managerId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (managerId) => managerId,
    },
    manager: {
      type: new GraphQLNonNull(managerType),
      resolve: (managerId) => ({ managerId, ...managerModel(managerId) }),
    },
  }),
})

const playerAlbumType = new GraphQLObjectType({
  name: 'PlayerAlbum',
  fields: () => ({
    ...createRelationship(seasonType, seasonModel),
    ...createRelationship(teamType, teamModel),
    sticker: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
})

const playerHistoryType = new GraphQLObjectType({
  name: 'PlayerHistory',
  fields: () => ({
    ...createRelationship(seasonType, seasonModel),
    ...createRelationship(teamType, teamModel),
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
    ...createRelationship(seasonType, seasonModel),
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
  fields: () => ({
    total: {
      type: new GraphQLNonNull(playerStatsTotalType),
      resolve: (playerId) => playerStatsModel(playerId),
    },
    history: {
      type: new GraphQLList(playerStatsHistoryType),
      resolve: (playerId) => playerStatsHistoryModel(playerId),
    },
  }),
})

const playerType = new GraphQLObjectType({
  name: 'Player',
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
    positionCode: {
      type: new GraphQLNonNull(PositionCodeType),
    },
    positionName: {
      type: new GraphQLNonNull(PositionNameType),
    },
    history: {
      type: new GraphQLList(playerHistoryType),
      resolve: ({ playerId }) => playerHistoryModel(playerId),
    },
    album: {
      type: new GraphQLList(playerAlbumType),
      resolve: ({ playerId }) => playerAlbumModel(playerId),
    },
    stats: {
      type: new GraphQLNonNull(playerStatsType),
      resolve: ({ playerId }) => playerId,
    },
  }),
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
  fields: () => ({
    ...createRelationship(playerType, playerModel),
    homeTeamId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    homeTeam: {
      type: new GraphQLNonNull(teamType),
      resolve: ({ homeTeamId }) => ({ teamId: homeTeamId, ...teamModel(homeTeamId) }),
    },
    awayTeamId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    awayTeam: {
      type: new GraphQLNonNull(teamType),
      resolve: ({ awayTeamId }) => ({ teamId: awayTeamId, ...teamModel(awayTeamId) }),
    },
    date: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'ISO 8601 date, e.g. 1954-05-10',
    },
  }),
})

const seasonTableType = new GraphQLObjectType({
  name: 'SeasonTable',
  fields: () => ({
    ...createRelationship(teamType, teamModel),
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
  }),
})

const seasonTopAssistsType = new GraphQLObjectType({
  name: 'SeasonTopAssists',
  fields: () => ({
    ...createRelationship(playerType, playerModel),
    assists: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    appearances: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    minutesPerAssist: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  }),
})

const seasonTopCleanSheetsType = new GraphQLObjectType({
  name: 'SeasonTopCleanSheets',
  fields: () => ({
    ...createRelationship(playerType, playerModel),
    cleanSheets: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    appearances: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  }),
})

const seasonTopScorersType = new GraphQLObjectType({
  name: 'SeasonTopScorers',
  fields: () => ({
    ...createRelationship(playerType, playerModel),
    goals: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    appearances: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    minutesPerGoal: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  }),
})

const seasonType = new GraphQLObjectType({
  name: 'Season',
  fields: () => ({
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
  }),
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

const teamStatsTotalType = new GraphQLObjectType({
  name: 'TeamStatsTotal',
  fields: () => ({
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
  }),
})

const teamStatsHistoryType = new GraphQLObjectType({
  name: 'TeamStatsHistory',
  fields: () => ({
    ...createRelationship(seasonType, seasonModel),
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
  }),
})

const teamStatsType = new GraphQLObjectType({
  name: 'TeamStats',
  fields: () => ({
    total: {
      type: new GraphQLNonNull(teamStatsTotalType),
      resolve: (teamId) => teamStatsModel(teamId),
    },
    history: {
      type: new GraphQLList(teamStatsHistoryType),
      resolve: (teamId) => teamStatsHistoryModel(teamId),
    },
  }),
})

const teamSquadPlayerType = new GraphQLObjectType({
  name: 'TeamSquadPlayer',
  fields: () => ({
    ...createRelationship(playerType, playerModel),
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
  }),
})

const teamSquadType = new GraphQLObjectType({
  name: 'TeamSquad',
  fields: () => ({
    ...createRelationship(seasonType, seasonModel),
    players: {
      type: new GraphQLList(teamSquadPlayerType),
      resolve: ({ teamId, seasonId }) => teamSquadModel(teamId, seasonId).players,
    },
    managers: {
      type: new GraphQLList(managersType),
      resolve: ({ teamId, seasonId }) => teamSquadManagersModel(teamId, seasonId),
    },
  }),
})

const teamType = new GraphQLObjectType({
  name: 'Team',
  fields: () => ({
    pulseId: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    optaId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    shortName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    grounds: {
      type: new GraphQLList(GraphQLString),
    },
    city: {
      type: new GraphQLNonNull(GraphQLString),
    },
    seasons: {
      type: new GraphQLList(seasonsType),
      resolve: ({ teamId }) => teamSeasonsModel(teamId),
    },
    squads: {
      type: new GraphQLList(teamSquadType),
      resolve: ({ teamId }) => teamSquadsModel(teamId),
    },
    // TODO: standardise terminology
    stats: {
      type: new GraphQLNonNull(teamStatsType),
      resolve: ({ teamId }) => teamId,
    },
  }),
})

const teamsType = new GraphQLObjectType({
  name: 'Teams',
  fields: {
    teamId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (teamId) => teamId,
    },
    team: {
      type: new GraphQLNonNull(teamType),
      resolve: (teamId) => ({ teamId, ...teamModel(teamId) }),
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
        if (validateArg(managerId, PERSON_ID, 'managerId')) {
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
        if (validateArg(playerId, PERSON_ID, 'playerId')) {
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
          type: PositionCodeType,
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
    team: {
      type: teamType,
      args: {
        teamId: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (_, { teamId }) => {
        if (validateArg(teamId, TEAM_ID, 'teamId')) {
          return { teamId, ...teamModel(teamId) }
        }
      },
    },
    teams: {
      type: new GraphQLList(teamsType),
      args: {
        name: {
          type: GraphQLString,
        },
      },
      resolve: (_, { name }) => {
        return teamsModel({ name })
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: rootQuery,
})

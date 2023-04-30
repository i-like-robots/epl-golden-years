const { PLAYER_ID } = require('../lib/constants')

module.exports = {
  tags: ['player'],
  summary: 'Get statistics for a player',
  description: 'Returns cumulative statistics for a player across all seasons',
  params: {
    playerId: {
      type: 'string',
      pattern: PLAYER_ID,
      description: 'ID of player',
    },
  },
  response: {
    200: {
      description: 'success',
      type: 'object',
      properties: {
        player: {
          type: 'string',
          format: 'uri',
        },
        statistics: {
          type: 'object',
          properties: {
            appearances: {
              type: 'integer',
            },
            cleanSheets: {
              type: 'integer',
            },
            goals: {
              type: 'integer',
            },
            assists: {
              type: 'integer',
            },
            hatTricks: {
              type: 'integer',
            },
          },
        },
      },
    },
    404: {
      // description: 'Player not found',
    },
  },
}

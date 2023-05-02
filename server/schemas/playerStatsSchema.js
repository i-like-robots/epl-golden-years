const { PLAYER_ID } = require('../lib/constants')
const { playerUrl, seasonUrl } = require('../lib/urls')

module.exports = {
  tags: ['player'],
  summary: 'Get statistics for a player',
  description: 'Returns statistics for a player both by season and cumulatively for the seasons they played in.',
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
          example: playerUrl('ken-monkou-648a'),
        },
        total: {
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
        history: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              season: {
                type: 'string',
                format: 'uri',
                example: seasonUrl('1993-1994'),
              },
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
    },
    404: {
      // description: 'Player not found',
    },
  },
}

const { PERSON_ID } = require('../../lib/constants')
const { playerUrl, seasonUrl } = require('../urls')
const errorSchema = require('./errorSchema')

module.exports = {
  tags: ['player'],
  summary: 'Get statistics for a player',
  description:
    'Returns statistics for a player both by season and cumulatively for the seasons they played in.',
  params: {
    playerId: {
      type: 'string',
      pattern: PERSON_ID,
      description: 'ID of player',
    },
  },
  response: {
    200: {
      description: 'OK',
      type: 'object',
      properties: {
        player: {
          type: 'string',
          format: 'uri',
          example: playerUrl('ken-monkou-c89e'),
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
    ...errorSchema,
  },
}

import { PERSON_ID } from '../../lib/constants.js'
import { playerUrl, seasonUrl } from '../urls.js'
import errorSchema from './errorSchema.js'

export default {
  tags: ['player'],
  summary: 'Get stats for a player',
  description:
    'Returns statistics for a player both by season and cumulatively for the seasons they played in.',
  params: {
    type: 'object',
    properties: {
      playerId: {
        type: 'string',
        pattern: PERSON_ID,
        description: 'ID of player',
      },
    },
    required: ['playerId'],
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

import { TEAM_ID } from '../../lib/constants.js'
import { teamUrl, seasonUrl } from '../urls.js'
import errorSchema from './errorSchema.js'

export default {
  tags: ['team'],
  summary: 'Get stats for a team',
  description:
    'Returns statistics for a team by season and cumulatively for the seasons they competed in.',
  params: {
    type: 'object',
    properties: {
      teamId: {
        type: 'string',
        pattern: TEAM_ID,
        description: 'ID of team',
      },
    },
    required: ['teamId'],
  },
  response: {
    200: {
      description: 'OK',
      type: 'object',
      properties: {
        team: {
          type: 'string',
          format: 'uri',
          example: teamUrl('nor'),
        },
        total: {
          type: 'object',
          properties: {
            played: {
              type: 'integer',
            },
            wins: {
              type: 'integer',
            },
            draws: {
              type: 'integer',
            },
            losses: {
              type: 'integer',
            },
            for: {
              type: 'integer',
            },
            against: {
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
                example: seasonUrl('1992-1993'),
              },
              played: {
                type: 'integer',
              },
              wins: {
                type: 'integer',
              },
              draws: {
                type: 'integer',
              },
              losses: {
                type: 'integer',
              },
              for: {
                type: 'integer',
              },
              against: {
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

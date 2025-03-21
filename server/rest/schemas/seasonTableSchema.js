import { SEASON_ID } from '../../lib/constants.js'
import { seasonUrl, teamUrl } from '../urls.js'
import errorSchema from './errorSchema.js'

export default {
  tags: ['season'],
  summary: 'Get the league table for a season',
  description: 'Returns the final league table standings for a season.',
  params: {
    type: 'object',
    properties: {
      seasonId: {
        type: 'string',
        pattern: SEASON_ID,
        description: 'ID of season',
      },
    },
    required: ['seasonId'],
  },
  response: {
    200: {
      description: 'OK',
      type: 'object',
      properties: {
        season: {
          type: 'string',
          format: 'uri',
          example: seasonUrl('1998-1999'),
        },
        table: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              team: {
                type: 'string',
                format: 'uri',
                example: teamUrl('nfo'),
              },
              rank: {
                type: 'integer',
              },
              points: {
                type: 'integer',
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
              diff: {
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

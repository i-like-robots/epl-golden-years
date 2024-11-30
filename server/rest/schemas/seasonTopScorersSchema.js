import { SEASON_ID } from '../../lib/constants.js'
import { seasonUrl, playerUrl } from '../urls.js'
import errorSchema from './errorSchema.js'

export default {
  tags: ['season'],
  summary: 'Get the top scorers for a season',
  description: 'Returns a list of players who scored the most goals within a season.',
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
              player: {
                type: 'string',
                format: 'uri',
                example: playerUrl('julian-joachim-3ade'),
              },
              goals: {
                type: 'integer',
              },
              appearances: {
                type: 'integer',
              },
              minutesPerGoal: {
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

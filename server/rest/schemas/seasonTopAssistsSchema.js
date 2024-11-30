import { SEASON_ID } from '../../lib/constants.js'
import { seasonUrl, playerUrl } from '../urls.js'
import errorSchema from './errorSchema.js'

export default {
  tags: ['season'],
  summary: 'Get the top assists for a season',
  description: 'Returns a list of players who provided the most assists within a season.',
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
          example: seasonUrl('1995-1996'),
        },
        table: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              player: {
                type: 'string',
                format: 'uri',
                example: playerUrl('darren-peacock-78af'),
              },
              assists: {
                type: 'integer',
              },
              appearances: {
                type: 'integer',
              },
              minutesPerAssist: {
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

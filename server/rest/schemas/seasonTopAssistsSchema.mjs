import { SEASON_ID } from '../../lib/constants.mjs'
import { seasonUrl, playerUrl } from '../urls.mjs'
import errorSchema from './errorSchema.mjs'

export default {
  tags: ['season'],
  summary: 'Get the top assists for a season',
  description: 'Returns a list of players who provided the most assists within a season.',
  params: {
    seasonId: {
      type: 'string',
      pattern: SEASON_ID,
      description: 'ID of season',
    },
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

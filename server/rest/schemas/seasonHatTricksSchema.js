import { SEASON_ID } from '../../lib/constants.js'
import { seasonsUrl, playerUrl } from '../urls.js'
import errorSchema from './errorSchema.js'

export default {
  tags: ['season'],
  summary: 'Get hat-tricks for a season',
  description: 'Returns a list of completed hat-tricks within a season.',
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
          example: seasonsUrl('1994-1995'),
        },
        hatTricks: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              player: {
                type: 'string',
                format: 'uri',
                example: playerUrl('tony-cottee-c708'),
              },
              homeTeam: {
                type: 'string',
                format: 'uri',
                example: playerUrl('whu'),
              },
              awayTeam: {
                type: 'string',
                format: 'uri',
                example: playerUrl('mci'),
              },
              date: {
                type: 'string',
                format: 'date',
                description: 'ISO 8601 date',
                example: '1994-12-17',
              },
            },
          },
        },
      },
    },
    ...errorSchema,
  },
}

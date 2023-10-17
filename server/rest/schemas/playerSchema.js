import { PERSON_ID, POSITION_CODES, POSITION_NAMES } from '../../lib/constants.js'
import { seasonUrl, playerStatsUrl, playerAlbumUrl, teamUrl } from '../urls.js'
import errorSchema from './errorSchema.js'

export default {
  tags: ['player'],
  summary: 'Get a player by ID',
  description: 'Returns details about a player and references to additional resources.',
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
        pulseId: {
          type: 'integer',
          example: 146,
        },
        optaId: {
          type: 'string',
          pattern: '^p\\d{2,4}$',
          example: 'p145',
        },
        positionCode: {
          type: 'string',
          enum: POSITION_CODES,
          example: 'G',
        },
        positionName: {
          type: 'string',
          enum: POSITION_NAMES,
          example: 'Goalkeeper',
        },
        displayName: {
          type: 'string',
          example: 'Nigel Martyn',
        },
        firstName: {
          type: 'string',
          example: 'Nigel',
        },
        lastName: {
          type: 'string',
          example: 'Martyn',
        },
        dateOfBirth: {
          type: 'string',
          format: 'date',
          description: 'ISO 8601 date',
          example: '1966-08-10',
        },
        countryCode: {
          type: 'string',
          pattern: '^[A-Z]{2}(?:-[A-Z]{2,3})?$',
          description: 'ISO-3166-1 code',
          example: 'GB-ENG',
        },
        countryName: {
          type: 'string',
          example: 'England',
        },
        history: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              season: {
                type: 'string',
                format: 'uri',
                example: seasonUrl('1999-2000'),
              },
              team: {
                type: 'string',
                format: 'uri',
                example: teamUrl('lee'),
              },
            },
          },
        },
        stats: {
          type: 'string',
          format: 'uri',
          example: playerStatsUrl('nigel-martyn-99a8'),
        },
        album: {
          type: 'string',
          format: 'uri',
          example: playerAlbumUrl('nigel-martyn-99a8'),
        },
      },
    },
    ...errorSchema,
  },
}

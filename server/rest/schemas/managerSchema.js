import { PERSON_ID } from '../../lib/constants.js'
import { seasonUrl, teamUrl } from '../urls.js'
import errorSchema from './errorSchema.js'

export default {
  tags: ['manager'],
  summary: 'Get a manager by ID',
  description: 'Returns details about a manager and references to additional resources.',
  params: {
    type: 'object',
    properties: {
      managerId: {
        type: 'string',
        pattern: PERSON_ID,
        description: 'ID of manager',
      },
    },
    required: ['managerId']
  },
  response: {
    200: {
      description: 'OK',
      type: 'object',
      properties: {
        pulseId: {
          type: 'integer',
          example: 1310,
        },
        optaId: {
          type: 'string',
          pattern: '^man\\d{2,5}$',
          example: 'man37359',
        },
        displayName: {
          type: 'string',
          example: 'John Gregory',
        },
        firstName: {
          type: 'string',
          example: 'John',
        },
        lastName: {
          type: 'string',
          example: 'Gregory',
        },
        dateOfBirth: {
          type: 'string',
          format: 'date',
          description: 'ISO-8601 date',
          example: '1954-05-10',
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
                example: teamUrl('avl'),
              },
            },
          },
        },
      },
    },
    ...errorSchema,
  },
}

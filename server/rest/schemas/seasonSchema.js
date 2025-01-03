import { SEASON_ID } from '../../lib/constants.js'
import {
  seasonTableUrl,
  seasonTopScorersUrl,
  seasonTopAssistsUrl,
  seasonHatTricksUrl,
  seasonTopCleanSheetsUrl,
} from '../urls.js'
import errorSchema from './errorSchema.js'

export default {
  tags: ['season'],
  summary: 'Get a season by ID',
  description: 'Returns details about a single season and references to additional resources.',
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
        displayName: {
          type: 'string',
          example: 'FA Carling Premiership',
        },
        shortName: {
          type: 'string',
          example: 'The Premier League',
        },
        sponsor: {
          type: 'string',
          example: 'Carling Brewery',
        },
        ball: {
          type: 'string',
          example: 'Mitre Pro Max',
        },
        start: {
          type: 'string',
          format: 'date',
          description: 'ISO 8601 date',
          example: '1992-08-15',
        },
        end: {
          type: 'string',
          format: 'date',
          description: 'ISO 8601 date',
          example: '1993-05-11',
        },
        table: {
          type: 'string',
          format: 'uri',
          example: seasonTableUrl('1992-1993'),
        },
        topScorers: {
          type: 'string',
          format: 'uri',
          example: seasonTopScorersUrl('1992-1993'),
        },
        topAssists: {
          type: 'string',
          format: 'uri',
          example: seasonTopAssistsUrl('1992-1993'),
        },
        topCleanSheets: {
          type: 'string',
          format: 'uri',
          example: seasonTopCleanSheetsUrl('1992-1993'),
        },
        hatTricks: {
          type: 'string',
          format: 'uri',
          example: seasonHatTricksUrl('1992-1993'),
        },
        links: {
          type: 'object',
          properties: {
            previous: {
              type: 'string',
              format: 'uri',
              nullable: true,
            },
            next: {
              type: 'string',
              format: 'uri',
              nullable: true,
            },
          },
        },
      },
    },
    ...errorSchema,
  },
}

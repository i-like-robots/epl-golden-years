const { SEASON_ID } = require('../../lib/constants')
const { seasonUrl, playerUrl } = require('../urls')
const errorSchema = require('./errorSchema')

module.exports = {
  tags: ['season'],
  summary: 'Get the top clean sheets for a season',
  description: 'Returns a list of goalkeepers who achieved the most clean sheets within a season.',
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
          example: seasonUrl('1993-1994'),
        },
        table: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              player: {
                type: 'string',
                format: 'uri',
                example: playerUrl('steve-ogrizovic-3e99'),
              },
              cleanSheets: {
                type: 'integer',
              },
              appearances: {
                type: 'integer',
              },
              cleanSheetRatio: {
                type: 'number',
                format: 'float',
              },
            },
          },
        },
      },
    },
    ...errorSchema,
  },
}

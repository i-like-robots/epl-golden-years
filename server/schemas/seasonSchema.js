const { SEASON_ID } = require('../lib/constants')
const {
  seasonTableUrl,
  seasonTopScorersUrl,
  seasonTopAssistsUrl,
  seasonHatTricksUrl,
} = require('../lib/urls')

module.exports = {
  tags: ['season'],
  summary: 'Get a season by ID',
  description: 'Returns details about a single season and references to additional resources.',
  params: {
    seasonId: {
      type: 'string',
      pattern: SEASON_ID,
      description: 'ID of season',
    },
  },
  response: {
    200: {
      description: 'success',
      type: 'object',
      properties: {
        table: {
          type: 'string',
          format: 'uri',
          example: seasonTableUrl('1999-2000'),
        },
        topScorers: {
          type: 'string',
          format: 'uri',
          example: seasonTopScorersUrl('1999-2000'),
        },
        topAssists: {
          type: 'string',
          format: 'uri',
          example: seasonTopAssistsUrl('1999-2000'),
        },
        hatTricks: {
          type: 'string',
          format: 'uri',
          example: seasonHatTricksUrl('1999-2000'),
        },
      },
    },
    404: {
      // description: 'Season not found',
    },
  },
}

const { SEASON_ID } = require('../lib/constants')

module.exports = {
  tags: ['season'],
  summary: 'Get hat-tricks by season',
  description: 'Returns a list of hat-tricks for a single season.',
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
        },
        topScorers: {
          type: 'string',
          format: 'uri',
        },
        topAssists: {
          type: 'string',
          format: 'uri',
        },
        hatTricks: {
          type: 'string',
          format: 'uri',
        },
      },
    },
    404: {
      // description: 'Season not found',
    },
  },
}

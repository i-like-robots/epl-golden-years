const { SEASON_ID } = require('../lib/constants')

module.exports = {
  tags: ['season'],
  summary: 'Get top assists by season',
  description: 'Returns a list of players with the most assists for a single season',
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
        season: {
          type: 'string',
          format: 'uri',
        },
        assists: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              player: {
                type: 'string',
                format: 'uri',
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
    404: {
      // description: 'Season not found',
    },
  },
}

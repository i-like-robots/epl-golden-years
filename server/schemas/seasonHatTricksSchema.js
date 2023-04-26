const { SEASON_ID } = require('../lib/constants')

module.exports = {
  // tags: ['season'],
  // summary: 'Get hat-tricks by season',
  // description: 'Returns a list of hat-tricks for a single season.',
  params: {
    seasonId: {
      type: 'string',
      pattern: SEASON_ID,
      // description: 'ID of season',
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        season: {
          type: 'string',
          format: 'uri',
        },
        hatTricks: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              player: {
                type: 'string',
                format: 'uri',
              },
              homeTeam: {
                type: 'string',
                format: 'uri',
              },
              awayTeam: {
                type: 'string',
                format: 'uri',
              },
              date: {
                type: 'string',
                format: 'date',
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

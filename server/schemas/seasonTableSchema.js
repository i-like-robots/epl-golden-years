const { SEASON_ID } = require('../lib/constants')

module.exports = {
  tags: ['season'],
  summary: 'Get league table by season',
  description: 'Returns final league table standings for a single season',
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
        table: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              team: {
                type: 'string',
                format: 'uri',
              },
              rank: {
                type: 'integer',
              },
              points: {
                type: 'integer',
              },
              played: {
                type: 'integer',
              },
              wins: {
                type: 'integer',
              },
              draws: {
                type: 'integer',
              },
              losses: {
                type: 'integer',
              },
              for: {
                type: 'integer',
              },
              against: {
                type: 'integer',
              },
              diff: {
                type: 'integer',
              },
            },
          },
        },
      },
      404: {
        // description: 'Season not found',
      },
    },
  },
}

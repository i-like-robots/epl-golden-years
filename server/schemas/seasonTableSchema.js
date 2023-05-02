const { SEASON_ID } = require('../lib/constants')
const { seasonUrl, teamUrl } = require('../lib/urls')

module.exports = {
  tags: ['season'],
  summary: 'Get the league table for a season',
  description: 'Returns the final league table standings for a season.',
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
          example: seasonUrl('1998-1999'),
        },
        table: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              team: {
                type: 'string',
                format: 'uri',
                example: teamUrl('nfo'),
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

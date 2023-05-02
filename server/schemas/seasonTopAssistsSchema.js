const { SEASON_ID } = require('../lib/constants')
const { seasonUrl, playerUrl } = require('../lib/urls')

module.exports = {
  tags: ['season'],
  summary: 'Get the top assists for a season',
  description: 'Returns a list of players who provided the most assists within a season.',
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
          example: seasonUrl('1995-1996'),
        },
        assists: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              player: {
                type: 'string',
                format: 'uri',
                example: playerUrl('darren-peacock-3ef9'),
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

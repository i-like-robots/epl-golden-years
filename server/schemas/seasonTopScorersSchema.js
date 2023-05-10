const { SEASON_ID } = require('../lib/constants')
const { seasonUrl, playerUrl } = require('../lib/urls')
const errorSchema = require('./errorSchema')

module.exports = {
  tags: ['season'],
  summary: 'Get the top scorers for a season',
  description: 'Returns a list of players who scored the most goals within a season.',
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
          example: seasonUrl('1998-1999'),
        },
        table: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              player: {
                type: 'string',
                format: 'uri',
                example: playerUrl('julian-joachim-3ade'),
              },
              goals: {
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
    ...errorSchema,
  },
}

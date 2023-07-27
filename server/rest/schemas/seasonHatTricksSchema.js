const { SEASON_ID } = require('../../lib/constants')
const { seasonsUrl, playerUrl } = require('../../lib/urls')
const errorSchema = require('./errorSchema')

module.exports = {
  tags: ['season'],
  summary: 'Get hat-tricks for a season',
  description: 'Returns a list of completed hat-tricks within a season.',
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
          example: seasonsUrl('1994-1995'),
        },
        hatTricks: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              player: {
                type: 'string',
                format: 'uri',
                example: playerUrl('tony-cottee-c708'),
              },
              homeTeam: {
                type: 'string',
                format: 'uri',
                example: playerUrl('whu'),
              },
              awayTeam: {
                type: 'string',
                format: 'uri',
                example: playerUrl('mci'),
              },
              date: {
                type: 'string',
                format: 'date',
                description: 'ISO 8601 date',
                example: '1994-12-17',
              },
            },
          },
        },
      },
    },
    ...errorSchema,
  },
}

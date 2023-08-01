const { PERSON_ID } = require('../../lib/constants')
const { seasonUrl, teamUrl, playerUrl } = require('../../lib/urls')
const errorSchema = require('./errorSchema')

module.exports = {
  tags: ['player'],
  summary: 'Get an album for a player',
  description: 'Returns an album of stickers for a player.',
  params: {
    playerId: {
      type: 'string',
      pattern: PERSON_ID,
      description: 'ID of player',
    },
  },
  response: {
    200: {
      description: 'OK',
      type: 'object',
      properties: {
        player: {
          type: 'string',
          format: 'uri',
          example: playerUrl('nigel-martyn-99a8'),
        },
        stickers: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              season: {
                type: 'string',
                format: 'uri',
                example: seasonUrl('1999-2000'),
              },
              team: {
                type: 'string',
                format: 'uri',
                example: teamUrl('lee'),
              },
              url: {
                type: 'string',
                format: 'uri',
                example: 'https://www.laststicker.com/i/cards/88/190.jpg',
              },
            },
          },
        },
      },
    },
    ...errorSchema,
  },
}

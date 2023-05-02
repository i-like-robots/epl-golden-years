const { PLAYER_ID } = require('../lib/constants')
const { seasonUrl, teamUrl, playerUrl } = require('../lib/urls')

module.exports = {
  tags: ['player'],
  summary: 'Get album for a player',
  description: 'Returns sticker album entries for a single player',
  params: {
    playerId: {
      type: 'string',
      pattern: PLAYER_ID,
      description: 'ID of player',
    },
  },
  response: {
    200: {
      description: 'success',
      type: 'object',
      properties: {
        player: {
          type: 'string',
          format: 'uri',
          example: playerUrl('nigel-martyn-ffae'),
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
    404: {
      // description: 'Player not found',
    },
  },
}

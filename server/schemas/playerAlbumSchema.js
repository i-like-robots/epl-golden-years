const { PLAYER_ID } = require('../lib/constants')

module.exports = {
  // tags: ['player'],
  // summary: 'Get stickers for a player',
  // description: 'Returns sticker album entries for a single player',
  params: {
    playerId: {
      type: 'string',
      pattern: PLAYER_ID,
      // description: 'ID of player',
    },
  },
  response: {
    200: {
      // description: 'success',
      type: 'object',
      properties: {
        player: {
          type: 'string',
          format: 'uri',
        },
        stickers: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              season: {
                type: 'string',
                format: 'uri',
              },
              team: {
                type: 'string',
                format: 'uri',
              },
              url: {
                type: 'string',
                format: 'uri',
              },
            },
          },
        },
      },
    },
    404: {
      //   description: 'Player not found',
    },
  },
}

const { PLAYER_ID, PLAYER_POSITIONS } = require('../lib/constants')
const { seasonUrl, playerStatsUrl, playerAlbumUrl } = require('../lib/urls')

module.exports = {
  tags: ['player'],
  summary: 'Get a player by ID',
  description: 'Returns details about a player and references to additional resources.',
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
        pulseId: {
          type: 'integer',
          example: 146,
        },
        optaId: {
          type: 'string',
          pattern: '^p\\d{3,5}$',
          example: 'p145',
        },
        positionCode: {
          type: 'string',
          enum: PLAYER_POSITIONS,
          example: 'G',
        },
        positionName: {
          type: 'string',
          enum: ['Goalkeeper', 'Defender', 'Midfielder', 'Winger', 'Forward'],
          example: 'Goalkeeper',
        },
        displayName: {
          type: 'string',
          example: 'Nigel Martyn',
        },
        firstName: {
          type: 'string',
          example: 'Nigel',
        },
        lastName: {
          type: 'string',
          example: 'Martyn',
        },
        dateOfBirth: {
          type: 'string',
          format: 'date',
          example: '1966-08-10',
        },
        countryCode: {
          type: 'string',
          format: 'ISO-3166-1',
          example: 'GB-ENG',
        },
        countryName: {
          type: 'string',
          example: 'England',
        },
        history: {
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
                example: seasonUrl('lee'),
              },
            },
          },
        },
        statistics: {
          type: 'string',
          format: 'uri',
          example: playerStatsUrl('nigel-martyn-ffae'),
        },
        album: {
          type: 'string',
          format: 'uri',
          example: playerAlbumUrl('nigel-martyn-ffae'),
        },
      },
    },
    404: {
      // description: 'Player not found',
    },
  },
}

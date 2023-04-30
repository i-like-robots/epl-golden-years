const { PLAYER_ID, PLAYER_POSITIONS } = require('../lib/constants')

module.exports = {
  tags: ['player'],
  summary: 'Get player by ID',
  description: 'Returns details for a single player',
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
        },
        optaId: {
          type: 'string',
          pattern: '^p\\d{3,5}$',
        },
        positionCode: {
          type: 'string',
          enum: PLAYER_POSITIONS,
        },
        positionName: {
          type: 'string',
        },
        displayName: {
          type: 'string',
        },
        firstName: {
          type: 'string',
        },
        lastName: {
          type: 'string',
        },
        dateOfBirth: {
          type: 'string',
          format: 'date',
        },
        countryCode: {
          type: 'string',
          format: 'ISO-3166-1',
        },
        countryName: {
          type: 'string',
        },
        history: {
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
            },
          },
        },
        statistics: {
          type: 'string',
          format: 'uri',
        },
        album: {
          type: 'string',
          format: 'uri',
        },
      },
    },
    404: {
      // description: 'Player not found',
    },
  },
}

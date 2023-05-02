const { PLAYER_POSITIONS } = require('../lib/constants')
const { playerUrl } = require('../lib/urls')

module.exports = {
  tags: ['player'],
  summary: 'List players',
  description: 'Returns a list of all players, optionally filtered by player name and position.',
  query: {
    name: {
      type: 'string',
      pattern: '^\\w+$',
      description: 'Filter players by name',
    },
    position: {
      type: 'string',
      enum: PLAYER_POSITIONS,
      description: 'Filter players by position',
    },
  },
  response: {
    200: {
      description: 'success',
      type: 'array',
      items: {
        type: 'string',
        format: 'uri',
        example: playerUrl('david-may-c5be'),
      },
    },
  },
}

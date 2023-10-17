import { POSITION_CODES } from '../../lib/constants.js'
import { playerUrl } from '../urls.js'
import errorSchema from './errorSchema.js'

export default {
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
      enum: POSITION_CODES,
      description: 'Filter players by position',
    },
  },
  response: {
    200: {
      description: 'OK',
      type: 'array',
      items: {
        type: 'string',
        format: 'uri',
        example: playerUrl('david-may-3f29'),
      },
    },
    400: errorSchema[400],
  },
}

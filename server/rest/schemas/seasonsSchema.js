import { TEAM_ID } from '../../lib/constants.js'
import { seasonUrl } from '../urls.js'
import errorSchema from './errorSchema.js'

export default {
  tags: ['season'],
  summary: 'List seasons',
  description: 'Returns a list of all seasons, optionally filtered by a team who played in them.',
  query: {
    team: {
      type: 'string',
      pattern: TEAM_ID,
      description: 'Filter seasons by participant team ID',
    },
  },
  response: {
    200: {
      description: 'OK',
      type: 'array',
      items: {
        type: 'string',
        format: 'uri',
        example: seasonUrl('1999-2000'),
      },
    },
    400: errorSchema[400],
  },
}

import { teamUrl } from '../urls.js'
import errorSchema from './errorSchema.js'

export default {
  tags: ['team'],
  summary: 'List teams',
  description: 'Returns a list of all teams, optionally filtered by team name.',
  query: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        pattern: '^\\w+$',
        description: 'Filter teams by name',
      },
    },
    required: [],
  },
  response: {
    200: {
      description: 'OK',
      type: 'array',
      items: {
        type: 'string',
        format: 'uri',
        example: teamUrl('qpr'),
      },
    },
    400: errorSchema[400],
  },
}

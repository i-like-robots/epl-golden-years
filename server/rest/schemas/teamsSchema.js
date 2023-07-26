const { teamUrl } = require('../../lib/urls')
const errorSchema = require('./errorSchema')

module.exports = {
  tags: ['team'],
  summary: 'List teams',
  description: 'Returns a list of all teams, optionally filtered by team name.',
  query: {
    name: {
      type: 'string',
      pattern: '^\\w+$',
      description: 'Filter teams by name',
    },
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

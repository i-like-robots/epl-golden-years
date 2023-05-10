const { managerUrl } = require('../lib/urls')
const errorSchema = require('./errorSchema')

module.exports = {
  tags: ['manager'],
  summary: 'List managers',
  description: 'Returns a list of all managers, optionally filtered by manager name.',
  query: {
    name: {
      type: 'string',
      pattern: '^\\w+$',
      description: 'Filter managers by name',
    },
  },
  response: {
    200: {
      description: 'OK',
      type: 'array',
      items: {
        type: 'string',
        format: 'uri',
        example: managerUrl('dave-bassett-30e2'),
      },
    },
    400: errorSchema[400],
  },
}

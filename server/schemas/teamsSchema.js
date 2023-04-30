module.exports = {
  tags: ['team'],
  summary: 'List teams',
  description: 'Returns a list of all teams, optionally filtered by team name',
  query: {
    name: {
      type: 'string',
      pattern: '^\\w+$',
      description: 'Filter teams by name',
    },
  },
  response: {
    200: {
      description: 'success',
      type: 'array',
      items: {
        type: 'string',
        format: 'uri',
      },
    },
  },
}

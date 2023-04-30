module.exports = {
  tags: [],
  summary: 'Root resources',
  description: 'Returns a list of all resource types',
  response: {
    200: {
      description: 'success',
      type: 'object',
      properties: {
        players: {
          type: 'string',
          format: 'uri',
        },
        seasons: {
          type: 'string',
          format: 'uri',
        },
        teams: {
          type: 'string',
          format: 'uri',
        },
      },
    },
  },
}

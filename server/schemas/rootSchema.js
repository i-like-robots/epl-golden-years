const { playersUrl, seasonsUrl, teamsUrl } = require('../lib/urls')

module.exports = {
  tags: [],
  summary: 'API root',
  description: 'Returns a list of all resource types presented by this API.',
  response: {
    200: {
      description: 'success',
      type: 'object',
      properties: {
        players: {
          type: 'string',
          format: 'uri',
          example: playersUrl(),
        },
        seasons: {
          type: 'string',
          format: 'uri',
          example: seasonsUrl(),
        },
        teams: {
          type: 'string',
          format: 'uri',
          example: teamsUrl(),
        },
      },
    },
  },
}

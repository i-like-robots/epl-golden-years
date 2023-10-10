import { playersUrl, seasonsUrl, teamsUrl, managersUrl } from '../urls.mjs'

export default {
  tags: [],
  summary: 'API root',
  description: 'Returns a list of all resource types presented by this API.',
  response: {
    200: {
      description: 'OK',
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
        managers: {
          type: 'string',
          format: 'uri',
          example: managersUrl(),
        },
      },
    },
  },
}

const { TEAM_ID } = require('../lib/constants')

module.exports = {
  tags: ['team'],
  summary: 'Get team by ID',
  description: 'Returns details for a single team',
  params: {
    teamId: {
      type: 'string',
      pattern: TEAM_ID,
      description: 'ID of team',
    },
  },
  response: {
    200: {
      description: 'success',
      type: 'object',
      properties: {
        pulseId: {
          type: 'integer',
        },
        optaId: {
          type: 'string',
          pattern: '^t\\d{1,3}$',
        },
        name: {
          type: 'string',
        },
        shortName: {
          type: 'string',
          pattern: TEAM_ID,
        },
        seasons: {
          type: 'array',
          items: {
            type: 'string',
            format: 'uri',
          },
        },
        squads: {
          type: 'string',
          format: 'uri',
        },
        statistics: {
          type: 'string',
          format: 'uri',
        },
      },
    },
    404: {
      // description: 'Team not found',
    },
  },
}

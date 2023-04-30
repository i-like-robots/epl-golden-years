const { TEAM_ID } = require('../lib/constants')

module.exports = {
  tags: ['team'],
  summary: 'Get statistics for a team',
  description: 'Returns cumulative statistics for a team across all seasons played',
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
        team: {
          type: 'string',
          format: 'uri',
        },
        statistics: {
          type: 'object',
          properties: {
            played: {
              type: 'integer',
            },
            wins: {
              type: 'integer',
            },
            draws: {
              type: 'integer',
            },
            losses: {
              type: 'integer',
            },
            for: {
              type: 'integer',
            },
            against: {
              type: 'integer',
            },
          },
        },
      },
    },
    404: {
      // description: 'Team not found',
    },
  },
}

const { TEAM_ID, SEASON_ID } = require('../lib/constants')

module.exports = {
  // tags: ['team'],
  // summary: 'Get squad by team and season',
  // description: 'Returns data about a single squad for a single team and season',
  params: {
    teamId: {
      type: 'string',
      pattern: TEAM_ID,
      // description: 'ID of team',
    },
    seasonId: {
      type: 'string',
      pattern: SEASON_ID,
      // description: 'ID of season',
    },
  },
  response: {
    200: {
      // description: 'success',
      type: 'object',
      properties: {
        team: {
          type: 'string',
          format: 'uri',
        },
        season: {
          type: 'string',
          format: 'uri',
        },
        players: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              player: {
                type: 'string',
                format: 'uri',
              },
              appearances: {
                type: 'integer',
              },
              cleanSheets: {
                type: 'integer',
              },
              goals: {
                type: 'integer',
              },
              assists: {
                type: 'integer',
              },
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

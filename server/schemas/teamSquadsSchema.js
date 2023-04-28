const { TEAM_ID } = require('../lib/constants')

module.exports = {
  // tags: ['team'],
  // summary: 'Get list of squads for a team',
  // description: 'Returns a list of all EPL squads for a single team',
  params: {
    teamId: {
      type: 'string',
      pattern: TEAM_ID,
      // description: 'ID of team',
    },
  },
  response: {
    200: {
      // description: 'success',
      type: 'array',
      items: {
        type: 'string',
        format: 'uri',
      },
    },
    404: {
      // description: 'Team not found',
    },
  },
}

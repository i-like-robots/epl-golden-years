const { TEAM_ID } = require('../../lib/constants')
const { teamUrl, teamSquadUrl } = require('../urls')
const errorSchema = require('./errorSchema')

module.exports = {
  tags: ['team'],
  summary: 'Get a list of squads for a team',
  description: 'Returns a list of all EPL squads for a single team',
  params: {
    teamId: {
      type: 'string',
      pattern: TEAM_ID,
      description: 'ID of team',
    },
  },
  response: {
    200: {
      description: 'OK',
      type: 'object',
      properties: {
        team: {
          type: 'string',
          format: 'uri',
          example: teamUrl('blb'),
        },
        squads: {
          type: 'array',
          items: {
            type: 'string',
            format: 'uri',
            example: teamSquadUrl('blb', '1994-1995'),
          },
        },
      },
    },
    ...errorSchema,
  },
}

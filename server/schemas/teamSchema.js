const { TEAM_ID } = require('../lib/constants')
const { seasonUrl, teamSquadsUrl, teamStatsUrl } = require('../lib/urls')

module.exports = {
  tags: ['team'],
  summary: 'Get a team by ID',
  description: 'Returns details for a single team and references to additional resources.',
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
          example: 29,
        },
        optaId: {
          type: 'string',
          pattern: '^t\\d{2,4}$',
          example: 't56',
        },
        name: {
          type: 'string',
          example: 'Sunderland',
        },
        shortName: {
          type: 'string',
          pattern: TEAM_ID,
          example: 'SUN',
        },
        seasons: {
          type: 'array',
          items: {
            type: 'string',
            format: 'uri',
            example: seasonUrl('1999-2000'),
          },
        },
        squads: {
          type: 'string',
          format: 'uri',
          example: teamSquadsUrl('sun'),
        },
        statistics: {
          type: 'string',
          format: 'uri',
          example: teamStatsUrl('sun'),
        },
      },
    },
    404: {
      // description: 'Team not found',
    },
  },
}

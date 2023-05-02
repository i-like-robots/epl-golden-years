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
          example: 21,
        },
        optaId: {
          type: 'string',
          pattern: '^t\\d{1,4}$',
          example: 't6',
        },
        name: {
          type: 'string',
          example: 'Tottenham Hotspur',
        },
        shortName: {
          type: 'string',
          example: 'Spurs',
        },
        ground: {
          type: 'string',
          example: 'White Hart Lane',
        },
        city: {
          type: 'string',
          example: 'London',
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
          example: teamSquadsUrl('tot'),
        },
        statistics: {
          type: 'string',
          format: 'uri',
          example: teamStatsUrl('tot'),
        },
      },
    },
    404: {
      // description: 'Team not found',
    },
  },
}

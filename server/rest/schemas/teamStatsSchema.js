const { TEAM_ID } = require('../../lib/constants')
const { teamUrl, seasonUrl } = require('../../lib/urls')
const errorSchema = require('./errorSchema')

module.exports = {
  tags: ['team'],
  summary: 'Get statistics for a team',
  description:
    'Returns statistics for a team by season and cumulatively for the seasons they competed in.',
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
          example: teamUrl('nor'),
        },
        total: {
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
        history: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              season: {
                type: 'string',
                format: 'uri',
                example: seasonUrl('1992-1993'),
              },
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
    },
    ...errorSchema,
  },
}

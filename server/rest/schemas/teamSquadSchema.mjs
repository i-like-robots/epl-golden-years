import { TEAM_ID, SEASON_ID } from '../../lib/constants.mjs'
import { managerUrl, teamUrl, seasonUrl, playerUrl } from '../urls.mjs'
import errorSchema from './errorSchema.mjs'

export default {
  tags: ['team'],
  summary: 'Get a squad for a team and season',
  description: 'Returns a list of players and their statistics for a team and season.',
  params: {
    teamId: {
      type: 'string',
      pattern: TEAM_ID,
      description: 'ID of team',
    },
    seasonId: {
      type: 'string',
      pattern: SEASON_ID,
      description: 'ID of season',
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
        season: {
          type: 'string',
          format: 'uri',
          example: seasonUrl('1994-1995'),
        },
        players: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              player: {
                type: 'string',
                format: 'uri',
                example: playerUrl('henning-berg-9b5d'),
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
        managers: {
          type: 'array',
          items: {
            type: 'string',
            format: 'uri',
            example: managerUrl('kenny-dalglish-b9f2'),
          },
        },
        links: {
          type: 'object',
          properties: {
            previous: {
              type: 'string',
              format: 'uri',
              nullable: true,
            },
            next: {
              type: 'string',
              format: 'uri',
              nullable: true,
            },
          },
        },
      },
    },
    ...errorSchema,
  },
}

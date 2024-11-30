import { TEAM_ID } from '../../lib/constants.js'
import { teamUrl, teamSquadUrl } from '../urls.js'
import errorSchema from './errorSchema.js'

export default {
  tags: ['team'],
  summary: 'Get a list of squads for a team',
  description: 'Returns a list of all EPL squads for a single team',
  params: {
    type: 'object',
    properties: {
      teamId: {
        type: 'string',
        pattern: TEAM_ID,
        description: 'ID of team',
      },
    },
    required: ['teamId'],
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

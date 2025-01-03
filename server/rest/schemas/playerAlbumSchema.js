import { PERSON_ID } from '../../lib/constants.js'
import { seasonUrl, teamUrl, playerUrl } from '../urls.js'
import errorSchema from './errorSchema.js'

export default {
  tags: ['player'],
  summary: 'Get an album for a player',
  description: 'Returns an album of football stickers for a player.',
  params: {
    type: 'object',
    properties: {
      playerId: {
        type: 'string',
        pattern: PERSON_ID,
        description: 'ID of player',
      },
    },
    required: ['playerId'],
  },
  response: {
    200: {
      description: 'OK',
      type: 'object',
      properties: {
        player: {
          type: 'string',
          format: 'uri',
          example: playerUrl('nigel-martyn-99a8'),
        },
        stickers: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              season: {
                type: 'string',
                format: 'uri',
                example: seasonUrl('1999-2000'),
              },
              team: {
                type: 'string',
                format: 'uri',
                example: teamUrl('lee'),
              },
              sticker: {
                type: 'string',
                format: 'uri',
                example: 'https://www.laststicker.com/i/cards/88/190.jpg',
              },
            },
          },
        },
      },
    },
    ...errorSchema,
  },
}

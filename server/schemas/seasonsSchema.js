const { TEAM_ID } = require('../lib/constants')
const { seasonUrl } = require('../lib/urls')

module.exports = {
  tags: ['season'],
  summary: 'List seasons',
  description: 'Returns a list of all seasons',
  query: {
    team: {
      type: 'string',
      pattern: TEAM_ID,
      description: 'Filter seasons by participant team ID',
    },
  },
  response: {
    200: {
      description: 'success',
      type: 'array',
      items: {
        type: 'string',
        format: 'uri',
        example: seasonUrl('1999-2000'),
      },
    },
  },
}

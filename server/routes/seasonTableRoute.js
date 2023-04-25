const { tables } = require('../dataset')
const { SEASON_ID } = require('../lib/constants')
const { seasonUrl, teamUrl } = require('../lib/urls')
const omit = require('../lib/object-omit')

const routeOptions = {
  schema: {
    params: {
      seasonId: {
        type: 'string',
        pattern: SEASON_ID,
      },
    },
  },
}

function routeHandler(request, response) {
  const { seasonId } = request.params
  const table = tables[seasonId]

  if (table) {
    const data = table.map((row) => ({
      team: teamUrl(row.teamId),
      ...omit(row, 'teamId'),
    }))

    response.send({ season: seasonUrl(seasonId), table: data })
  } else {
    response.code(404)
    response.send({ error: 'Season not found' })
  }
}

module.exports = { routeOptions, routeHandler }

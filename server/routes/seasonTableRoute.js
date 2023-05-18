const { tables } = require('../dataset')
const { seasonUrl, teamUrl } = require('../lib/urls')
const omit = require('../lib/object-omit')
const get = require('../lib/object-get')

module.exports = function seasonRoute(request, response) {
  const { seasonId } = request.params
  const table = get(tables, seasonId)

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

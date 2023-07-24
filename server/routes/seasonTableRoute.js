const seasonTableModel = require('../resources/seasonTable/model')
const { seasonUrl, teamUrl } = require('../lib/urls')

module.exports = function seasonTableRoute(request, response) {
  const { seasonId } = request.params
  const table = seasonTableModel(seasonId)

  if (table) {
    const data = table.map((row) => ({
      ...row,
      teamId: undefined,
      team: teamUrl(row.teamId),
    }))

    response.send({ season: seasonUrl(seasonId), table: data })
  } else {
    response.code(404)
    response.send({ error: 'Season not found' })
  }
}

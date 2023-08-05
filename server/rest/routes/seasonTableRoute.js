const seasonTableModel = require('../../models/seasonTableModel')
const { seasonUrl, teamUrl } = require('../urls')

module.exports = function seasonTableRoute(request, response) {
  const { seasonId } = request.params
  const table = seasonTableModel(seasonId)

  if (table) {
    const data = table.map((row) => ({
      ...row,
      team: teamUrl(row.teamId),
    }))

    response.send({ season: seasonUrl(seasonId), table: data })
  } else {
    response.code(404)
    response.send({ error: 'Season not found' })
  }
}

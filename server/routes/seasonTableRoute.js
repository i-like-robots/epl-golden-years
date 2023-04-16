const { tables }  = require('../dataset')
const { seasonUrl, teamUrl } = require('../lib/urls')
const omit = require('../lib/object-omit')

module.exports = function tableRoute(request, response) {
  const { seasonId } = request.params
  const table = tables[seasonId]

  if (table) {
    const tableData = {
      season: seasonUrl(seasonId),
      table: table.map((row) => (
        {
          team: teamUrl(row.teamId),
          ...omit(row, 'teamId'),
        }
      ))
    }

    response.send(tableData)
  } else {
    response.code(404)
    response.send({ error: 'Season not found' })
  }
}

const omit = require('../lib/object-omit')
const restfulUri = require('../lib/baseUrl')
const tables = require('../../data/tables.json')

module.exports = function tableRoute(request, response) {
  const tableId = request.params.tableId
  const table = tables[tableId]

  if (table) {
    const tableData = {
      season: restfulUri(request, 'seasons', tableId),
      table: table.map((row) => (
        {
          team: restfulUri(request, 'teams', row.teamId),
          ...omit(row, 'teamId'),
        }
      ))
    }

    response.json(tableData)
  } else {
    response.sendStatus(404)
  }
}

const tables = require('../../data/tables.json')

module.exports = function tableRoute(request, response) {
  const seasonId = request.params.seasonId
  const table = tables[seasonId]

  if (table) {
    response.json({ seasonId, table })
  } else {
    response.sendStatus(404)
  }
}

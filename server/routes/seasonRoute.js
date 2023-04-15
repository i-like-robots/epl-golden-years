const tables = require('../../data/tables.json')
const baseUrl = require('../lib/baseUrl')

module.exports = function seasonRoute(request, response) {
  const seasonId = request.params.seasonId
  const season = tables[seasonId]

  if (season) {
    const seasonData = {
      id: seasonId,
      table: baseUrl(request, 'tables', seasonId),
    }

    response.json(seasonData)
  } else {
    response.sendStatus(404)
  }
}

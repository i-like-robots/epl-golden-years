const tables = require('../../data/tables.json')
const restfulUri = require('../lib/baseUrl')

module.exports = function seasonRoute(request, response) {
  const seasonId = request.params.seasonId
  const season = tables[seasonId]

  if (season) {
    const seasonData = {
      season: seasonId,
      table: restfulUri(request, 'seasons', seasonId, 'table'),
    }

    response.json(seasonData)
  } else {
    response.sendStatus(404)
  }
}

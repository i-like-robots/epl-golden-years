const tables = require('../../data/tables.json')
const restfulUri = require('../lib/baseUrl')

module.exports = function seasonRoute(request, response) {
  const { seasonId } = request.params
  const table = tables[seasonId]

  if (table) {
    const seasonData = {
      id: seasonId,
      topScorers: restfulUri(request, 'seasons', seasonId, 'top-scorers'),
      table: restfulUri(request, 'seasons', seasonId, 'table'),
    }

    response.json(seasonData)
  } else {
    response.sendStatus(404)
  }
}

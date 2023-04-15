const tables = require('../../data/tables.json')
const restfulUri = require('../lib/baseUrl')

module.exports = function seasonRoute(request, response) {
  const { seasonId } = request.params
  const table = tables[seasonId]

  if (table) {
    const seasonData = {
      table: restfulUri(request, 'seasons', seasonId, 'table'),
      topScorers: restfulUri(request, 'seasons', seasonId, 'top-scorers'),
      topAssists: restfulUri(request, 'seasons', seasonId, 'top-assists'),
    }

    response.json(seasonData)
  } else {
    response.sendStatus(404)
  }
}

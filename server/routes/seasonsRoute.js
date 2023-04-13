const baseUrl = require('../lib/baseUrl')
const tables = require('../../data/tables.json')

module.exports = function seasonsRoute(request, response) {
  const seasonIds = Object.keys(tables)
  const seasonsData = seasonIds.map((seasonId) => (
    {
      id: seasonId,
      rel: baseUrl(request, 'seasons', seasonId),
    }
  ))

  response.json(seasonsData)
}

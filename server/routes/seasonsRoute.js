const { seasonUrl } = require('../lib/urls')
const tables = require('../../data/tables.json')

module.exports = function seasonsRoute(request, response) {
  const seasonsData = Object.keys(tables).map((seasonId) => seasonUrl(seasonId))

  response.json(seasonsData)
}

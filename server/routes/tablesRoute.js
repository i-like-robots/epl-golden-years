const tables = require('../../data/tables.json')

module.exports = function tablesRoute(request, response) {
  const seasonIds = Object.keys(tables)
  response.json(seasonIds)
}

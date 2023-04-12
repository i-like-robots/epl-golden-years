const baseUrl = require('../lib/baseUrl')
const tables = require('../../data/tables.json')

module.exports = function tablesRoute(request, response) {
  const tableIds = Object.keys(tables)
  const tablesData = tableIds.map((tableId) => (
    {
      id: tableId,
      rel: baseUrl(request, 'tables', tableId),
    }
  ))

  response.json(tablesData)
}

const tables = require('../../data/tables.json')

module.exports = function tablesRoute(request, response) {
  const tableIds = Object.keys(tables)
  const tablesData = tableIds.map((tableId) => (
    {
      season: tableId,
      rel: `${request.protocol}://${request.get('host')}/tables/${tableId}`
    }
  ))

  response.json(tablesData)
}

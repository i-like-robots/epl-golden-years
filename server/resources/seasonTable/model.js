const { tables } = require('../../dataset')
const get = require('../../lib/object-get')

module.exports = function seasonModel(seasonId) {
  const table = get(tables, seasonId)

  if (table) {
    return table
  }
}

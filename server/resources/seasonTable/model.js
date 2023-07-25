const { tables } = require('../../dataset')
const get = require('../../lib/object-get')

module.exports = function seasonTableModel(seasonId) {
  return get(tables, seasonId)
}

const { hatTricks, tables } = require('../../dataset')
const get = require('../../lib/object-get')

module.exports = function seasonHatTricksModel(seasonId) {
  const table = get(tables, seasonId)

  if (table) {
    return hatTricks.filter((h) => h.seasonId === seasonId)
  }
}

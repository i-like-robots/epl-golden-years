const { seasons } = require('../../dataset')
const get = require('../../lib/object-get')

module.exports = function seasonModel(seasonId) {
  const season = get(seasons, seasonId)

  if (season) {
    return season
  }
}

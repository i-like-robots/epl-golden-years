const { seasons } = require('../../dataset')
const get = require('../../lib/object-get')

module.exports = function seasonModel(seasonId) {
  return get(seasons, seasonId)
}

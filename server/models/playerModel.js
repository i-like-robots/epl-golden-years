const { players } = require('../dataset')
const get = require('../lib/object-get')

module.exports = function playerModel(playerId) {
  return get(players, playerId)
}

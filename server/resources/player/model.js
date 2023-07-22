const { players } = require('../../dataset')
const get = require('../../lib/object-get')

module.exports = function playerModel(playerId) {
  const player = get(players, playerId)

  if (player) {
    return player
  }
}

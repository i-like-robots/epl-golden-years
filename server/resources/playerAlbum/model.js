const { players, stickers } = require('../../dataset')
const get = require('../../lib/object-get')

module.exports = function playerAlbumModel(playerId) {
  const player = get(players, playerId)

  if (player) {
    return stickers[playerId] || []
  }
}

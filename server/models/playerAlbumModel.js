const { stickers } = require('../dataset')
const get = require('../lib/object-get')

module.exports = function playerAlbumModel(playerId) {
  return get(stickers, playerId) || []
}

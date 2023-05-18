const { players, stickers } = require('../dataset')
const { seasonUrl, teamUrl, playerUrl } = require('../lib/urls')
const get = require('../lib/object-get')

module.exports = function playerAlbumRoute(request, response) {
  const { playerId } = request.params
  const player = get(players, playerId)

  if (player) {
    const album = stickers[playerId] || []

    const data = album.map((sticker) => ({
      season: seasonUrl(sticker.seasonId),
      team: teamUrl(sticker.teamId),
      url: sticker.sticker,
    }))

    response.send({ player: playerUrl(playerId), stickers: data })
  } else {
    response.code(404)
    response.send({ error: 'Player not found' })
  }
}

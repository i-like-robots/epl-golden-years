const playerModel = require('../../resources/player/model')
const playerAlbumModel = require('../../resources/playerAlbum/model')
const { seasonUrl, teamUrl, playerUrl } = require('../../lib/urls')

module.exports = function playerAlbumRoute(request, response) {
  const { playerId } = request.params
  const player = playerModel(playerId)

  if (player) {
    const data = playerAlbumModel(playerId).map((sticker) => ({
      season: seasonUrl(sticker.seasonId),
      team: teamUrl(sticker.teamId),
      // TODO: standardise on url or sticker
      url: sticker.sticker,
    }))

    response.send({ player: playerUrl(playerId), stickers: data })
  } else {
    response.code(404)
    response.send({ error: 'Player not found' })
  }
}

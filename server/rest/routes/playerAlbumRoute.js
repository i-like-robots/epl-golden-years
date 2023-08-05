const playerModel = require('../../models/playerModel')
const playerAlbumModel = require('../../models/playerAlbumModel')
const { seasonUrl, teamUrl, playerUrl } = require('../urls')

module.exports = function playerAlbumRoute(request, response) {
  const { playerId } = request.params
  const player = playerModel(playerId)

  if (player) {
    const data = playerAlbumModel(playerId).map((sticker) => ({
      season: seasonUrl(sticker.seasonId),
      team: teamUrl(sticker.teamId),
      sticker: sticker.sticker,
    }))

    response.send({ player: playerUrl(playerId), stickers: data })
  } else {
    response.code(404)
    response.send({ error: 'Player not found' })
  }
}

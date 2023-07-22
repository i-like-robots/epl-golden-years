const playerAlbumModel = require('../resources/playerAlbum/model')
const { seasonUrl, teamUrl, playerUrl } = require('../lib/urls')

module.exports = function playerAlbumRoute(request, response) {
  const { playerId } = request.params
  const album = playerAlbumModel(playerId)

  if (album) {
    const data = album.map((sticker) => ({
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

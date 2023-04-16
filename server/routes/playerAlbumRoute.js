const { players, stickers } = require('../dataset')
const { seasonUrl, teamUrl } = require('../lib/urls')

module.exports = function playerAlbumRoute(request, response) {
  const { playerId } = request.params
  const player = players[playerId]

  if (player) {
    const albumData = (stickers[playerId] || []).map((sticker) => (
      {
        season: seasonUrl(sticker.seasonId),
        team: teamUrl(sticker.teamId),
        url: sticker.sticker,
      }
    ))

    response.send(albumData)
  } else {
    response.code(404)
    response.send({ error: 'Player not found' })
  }
}

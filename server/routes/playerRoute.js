const playerModel = require('../resources/player/model')
const playerHistoryModel = require('../resources/playerHistory/model')
const { playerAlbumUrl, playerStatsUrl, seasonUrl, teamUrl } = require('../lib/urls')

module.exports = function playerRoute(request, response) {
  const { playerId } = request.params
  const player = playerModel(playerId)

  if (player) {
    const history = playerHistoryModel(playerId).map((record) => ({
      season: seasonUrl(record.seasonId),
      team: teamUrl(record.teamId),
    }))

    const statistics = playerStatsUrl(playerId)

    const album = playerAlbumUrl(playerId)

    response.send({ ...player, history, statistics, album })
  } else {
    response.code(404)
    response.send({ error: 'Player not found' })
  }
}

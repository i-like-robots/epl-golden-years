const playerStatsModel = require('../resources/playerStats/model')
const { playerUrl, seasonUrl } = require('../lib/urls')

module.exports = function playerStatsRoute(request, response) {
  const { playerId } = request.params
  const stats = playerStatsModel(playerId)

  if (stats) {
    const history = stats.history.map((history) => ({
      ...history,
      season: seasonUrl(history.seasonId),
    }))

    response.send({ ...stats, history, player: playerUrl(playerId) })
  } else {
    response.code(404)
    response.send({ error: 'Player not found' })
  }
}

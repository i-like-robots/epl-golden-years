const playerStatsModel = require('../resources/playerStats/model')
const playerStatsHistory = require('../resources/playerStatsHistory/model')
const { playerUrl, seasonUrl } = require('../lib/urls')

module.exports = function playerStatsRoute(request, response) {
  const { playerId } = request.params
  const stats = playerStatsModel(playerId)

  if (stats) {
    const history = playerStatsHistory(playerId).map((record) => ({
      ...record,
      season: seasonUrl(record.seasonId),
    }))

    response.send({ player: playerUrl(playerId), total: stats, history })
  } else {
    response.code(404)
    response.send({ error: 'Player not found' })
  }
}

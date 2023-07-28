const seasonTopScorersModel = require('../../models/seasonTopScorersModel')
const { playerUrl, seasonUrl } = require('../../lib/urls')

module.exports = function seasonTopScorersRoute(request, response) {
  const { seasonId } = request.params
  const data = seasonTopScorersModel(seasonId)

  if (data.length) {
    const table = data.map((player) => ({
      ...player,
      player: playerUrl(player.playerId),
    }))

    response.send({ season: seasonUrl(seasonId), table })
  } else {
    response.code(404)
    response.send({ error: 'Season not found' })
  }
}

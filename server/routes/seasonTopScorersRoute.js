const seasonTopScorersModel = require('../resources/seasonTopScorers/model')
const { playerUrl, seasonUrl } = require('../lib/urls')

module.exports = function seasonTopScorersRoute(request, response) {
  const { seasonId } = request.params
  const data = seasonTopScorersModel(seasonId)

  if (data) {
    const table = data.map((player) => ({
      ...player,
      playerId: undefined,
      player: playerUrl(player.playerId),
    }))

    response.send({ season: seasonUrl(seasonId), table })
  } else {
    response.code(404)
    response.send({ error: 'Season not found' })
  }
}

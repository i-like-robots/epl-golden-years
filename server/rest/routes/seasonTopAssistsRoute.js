const seasonTopAssistsModel = require('../../models/seasonTopAssistsModel')
const { playerUrl, seasonUrl } = require('../urls')

module.exports = function seasonTopAssistsRoute(request, response) {
  const { seasonId } = request.params
  const data = seasonTopAssistsModel(seasonId)

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

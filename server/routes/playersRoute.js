const playersModel = require('../resources/players/model')
const { playerUrl } = require('../lib/urls')

module.exports = function playerRoute(request, response) {
  const { name, position } = request.query
  const playerIds = playersModel({ name, position })

  response.send(playerIds.map((playerId) => playerUrl(playerId)))
}

const playersModel = require('../../models/playersModel')
const { playerUrl } = require('../urls')

module.exports = function playerRoute(request, response) {
  const { name, position } = request.query
  const playerIds = playersModel({ name, position })

  response.send(playerIds.map((playerId) => playerUrl(playerId)))
}

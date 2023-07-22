const playersModel = require('../resources/players/model')
const { playerUrl } = require('../lib/urls')

module.exports = function playerRoute(request, response) {
  const { name, position } = request.query
  const playersData = playersModel({ name, position })

  response.send(playersData.map((playerId) => playerUrl(playerId)))
}

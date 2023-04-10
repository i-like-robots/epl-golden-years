const players = require('../../data/players.json')

module.exports = function playersRoute(request, response) {
  const playerIds = Object.keys(players)
  response.json(playerIds)
}

const baseUrl = require('../lib/baseUrl')
const players = require('../../data/players.json')

module.exports = function playersRoute(request, response) {
  const playerIds = Object.keys(players)
  const playersData = playerIds.map((playerId) => (
    {
      id: playerId,
      rel: baseUrl(request, 'players', playerId),
    }
  ))

  response.json(playersData)
}

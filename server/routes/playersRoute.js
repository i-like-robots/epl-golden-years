const players = require('../../data/players.json')

module.exports = function playersRoute(request, response) {
  const playerIds = Object.keys(players)
  const playersData = playerIds.map((playerId) => (
    {
      id: playerId,
      rel: `${request.protocol}://${request.get('host')}/players/${playerId}`
    }
  ))

  response.json(playersData)
}

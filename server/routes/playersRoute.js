const baseUrl = require('../lib/baseUrl')
const matches = require('../lib/object-matches')
const players = require('../../data/players.json')

module.exports = function playersRoute(request, response) {
  const playerIds = Object.keys(players)
  const playersData = []

  const matcher = request.query.search ? matches(request.query.search) : null

  playerIds.forEach((playerId) => {
    const player = players[playerId]

    if (matcher ? matcher(player, 'displayName', 'firstName', 'lastName') : true) {
      playersData.push({
        id: playerId,
        rel: baseUrl(request, 'players', playerId),
      })
    }
  })

  response.json(playersData)
}

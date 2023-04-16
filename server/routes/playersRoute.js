const matches = require('../lib/object-matches')
const { playerUrl } = require('../lib/urls')
const players = require('../../data/players.json')

module.exports = function playersRoute(request, response) {
  const matcher = request.query.search ? matches(request.query.search) : null
  const playersData = []

  Object.keys(players).forEach((playerId) => {
    const player = players[playerId]

    if (matcher ? matcher(player, 'displayName', 'firstName', 'lastName') : true) {
      playersData.push(playerUrl(playerId))
    }
  })

  response.json(playersData)
}

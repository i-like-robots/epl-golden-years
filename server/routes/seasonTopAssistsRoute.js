const squads = require('../../data/squads.json')
const restfulUri = require('../lib/baseUrl')

module.exports = function seasonTopAssistsRoute(request, response) {
  const { seasonId } = request.params

  const assisters = []

  squads.forEach((squad) => {
    if (squad.seasonId === seasonId) {
      squad.players.forEach((player) => {
        if (player.assists) {
          assisters.push(player)
        }
      })
    }
  })

  if (assisters.length) {
    assisters.sort((a, b) => {
      if (a.assists > b.assists) return -1
      if (a.assists < b.assists) return 1
      if (a.goals > b.goals) return -1
      if (a.goals < b.goals) return 1

      return 0
    })

    const assistersData = assisters.slice(0, 10).map((player) => ({
      player: restfulUri(request, 'players', player.playerId),
      assists: player.assists,
    }))

    response.json(assistersData)
  } else {
    response.sendStatus(404)
  }
}
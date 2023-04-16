const pick = require('../lib/object-pick')
const restfulUri = require('../lib/baseUrl')
const squads = require('../../data/squads.json')

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
      ...pick(player, 'assists', 'goals', 'appearances'),
      mpa: Math.round((player.appearances * 90) / player.assists),
    }))

    response.json(assistersData)
  } else {
    response.sendStatus(404)
  }
}
const pick = require('../lib/object-pick')
const restfulUri = require('../lib/baseUrl')
const squads = require('../../data/squads.json')

module.exports = function seasonTopScorersRoute(request, response) {
  const { seasonId } = request.params

  const scorers = []

  squads.forEach((squad) => {
    if (squad.seasonId === seasonId) {
      squad.players.forEach((player) => {
        if (player.goals) {
          scorers.push(player)
        }
      })
    }
  })

  if (scorers.length) {
    scorers.sort((a, b) => {
      if (a.goals > b.goals) return -1
      if (a.goals < b.goals) return 1
      if (a.assists > b.assists) return -1
      if (a.assists < b.assists) return 1

      return 0
    })

    const scorersData = scorers.slice(0, 10).map((player) => ({
      player: restfulUri(request, 'players', player.playerId),
      ...pick(player, 'goals', 'assists', 'appearances'),
      mpg: Math.round((player.appearances * 90) / player.goals),
    }))

    response.json(scorersData)
  } else {
    response.sendStatus(404)
  }
}
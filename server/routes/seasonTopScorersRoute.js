const { squads } = require('../dataset')
const { playerUrl } = require('../lib/urls')
const pick = require('../lib/object-pick')

module.exports = function seasonTopScorersRoute(request, response) {
  const { seasonId } = request.params

  const players = []

  squads.forEach((squad) => {
    if (squad.seasonId === seasonId) {
      squad.players.forEach((player) => {
        if (player.goals) {
          players.push(player)
        }
      })
    }
  })

  if (players.length) {
    players.sort((a, b) => {
      if (a.goals > b.goals) return -1
      if (a.goals < b.goals) return 1
      if (a.assists > b.assists) return -1
      if (a.assists < b.assists) return 1

      return 0
    })

    const scorersData = players.slice(0, 10).map((player) => ({
      player: playerUrl(player.playerId),
      ...pick(player, 'goals', 'assists', 'appearances'),
      mpg: Math.round((player.appearances * 90) / player.goals),
    }))

    response.send(scorersData)
  } else {
    response.sendStatus(404)
  }
}
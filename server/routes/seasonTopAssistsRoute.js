const pick = require('../lib/object-pick')
const { playerUrl } = require('../lib/urls')
const squads = require('../../data/squads.json')

module.exports = function seasonTopAssistsRoute(request, response) {
  const { seasonId } = request.params

  const players = []

  squads.forEach((squad) => {
    if (squad.seasonId === seasonId) {
      squad.players.forEach((player) => {
        if (player.assists) {
          players.push(player)
        }
      })
    }
  })

  if (players.length) {
    players.sort((a, b) => {
      if (a.assists > b.assists) return -1
      if (a.assists < b.assists) return 1
      if (a.goals > b.goals) return -1
      if (a.goals < b.goals) return 1

      return 0
    })

    const assistsData = players.slice(0, 10).map((player) => ({
      player: playerUrl(player.playerId),
      ...pick(player, 'assists', 'goals', 'appearances'),
      mpa: Math.round((player.appearances * 90) / player.assists),
    }))

    response.json(assistsData)
  } else {
    response.sendStatus(404)
  }
}
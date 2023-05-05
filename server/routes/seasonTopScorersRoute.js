const { squads } = require('../dataset')
const { playerUrl, seasonUrl } = require('../lib/urls')
const pick = require('../lib/object-pick')

module.exports = function seasonTopScorersRoute(request, response) {
  const { seasonId } = request.params
  const data = []

  squads.forEach((squad) => {
    if (squad.seasonId === seasonId) {
      squad.players.forEach((player) => {
        if (player.goals) {
          data.push(player)
        }
      })
    }
  })

  if (data.length) {
    data.sort((a, b) => {
      if (a.goals > b.goals) return -1
      if (a.goals < b.goals) return 1
      if (a.appearances > b.appearances) return 1
      if (a.appearances < b.appearances) return -1

      return 0
    })

    const table = data.slice(0, 10).map((player) => ({
      player: playerUrl(player.playerId),
      ...pick(player, 'goals', 'appearances'),
      minutesPerGoal: Math.round((player.appearances * 90) / player.goals),
    }))

    response.send({ season: seasonUrl(seasonId), table })
  } else {
    response.code(404)
    response.send({ error: 'Season not found' })
  }
}

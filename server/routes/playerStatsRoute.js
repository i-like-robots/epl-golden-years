const { players, squads, hatTricks } = require('../dataset')
const { playerUrl } = require('../lib/urls')

module.exports = function playerStatsRoute(request, response) {
  const { playerId } = request.params
  const player = players[playerId]

  if (player) {
    const squadHistory = squads.filter((squad) =>
      squad.players.some((p) => p.playerId === playerId)
    )

    const data = {
      appearances: 0,
      cleanSheets: 0,
      goals: 0,
      assists: 0,
    }

    squadHistory.forEach((squad) => {
      const member = squad.players.find((p) => p.playerId === playerId)

      data.appearances += member.appearances
      data.cleanSheets += member.cleanSheets
      data.goals += member.goals
      data.assists += member.assists
    })

    data.hatTricks = hatTricks.filter((hatTrick) => hatTrick.playerId === playerId).length

    response.send({ player: playerUrl(playerId), statistics: data })
  } else {
    response.code(404)
    response.send({ error: 'Player not found' })
  }
}

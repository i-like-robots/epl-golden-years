const { players, squads, hatTricks } = require('../dataset')

module.exports = function playerStatsRoute(request, response) {
  const { playerId } = request.params
  const player = players[playerId]

  if (player) {
    const squadHistory = squads.filter((squad) =>
      squad.players.some((p) => p.playerId === playerId)
    )

    const stats = { appearances: 0, cleanSheets: 0, goals: 0, assists: 0 }

    squadHistory.forEach((squad) => {
      const member = squad.players.find((p) => p.playerId === playerId)

      stats.appearances += member.appearances
      stats.cleanSheets += member.cleanSheets
      stats.goals += member.goals
      stats.assists += member.assists
    })

    stats.hatTricks = hatTricks.filter((hatTrick) => hatTrick.playerId === playerId).length

    response.send({ stats })
  } else {
    response.sendStatus(404)
  }
}

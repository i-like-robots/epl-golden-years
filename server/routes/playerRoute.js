const squads = require('../../data/squads.json')
const tables = require('../../data/tables.json')
const players = require('../../data/players.json')
const stickers = require('../../data/laststicker.json')

module.exports = function playerRoute(request, response) {
  const playerId = request.params.playerId
  const player = players[playerId]

  if (player) {
    const squadHistory = squads.filter((squad) =>
      squad.players.some((p) => p.playerId === playerId)
    )

    const history = []
    const stats = { appearances: 0, cleanSheets: 0, goals: 0 }

    squadHistory.forEach((squad) => {
      const table = tables[squad.seasonId]
      const result = table.find((t) => t.teamId === squad.teamId)
      const member = squad.players.find((p) => p.playerId === playerId)

      history.push({
        seasonId: squad.seasonId,
        teamId: squad.teamId,
        rank: result.rank,
        appearances: member.appearances,
        cleanSheets: member.cleanSheets,
        goals: member.goals,
      })

      stats.appearances += member.appearances
      stats.cleanSheets += member.cleanSheets
      stats.goals += member.goals
    })

    const album = stickers[playerId] || []

    response.json({ ...player, history, stats, album })
  } else {
    response.sendStatus(404)
  }
}

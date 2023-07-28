const { tables, teams } = require('../dataset')
const get = require('../lib/object-get')

module.exports = function teamStatsModel(teamId) {
  const team = get(teams, teamId)

  if (team) {
    const total = {
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      for: 0,
      against: 0,
    }

    Object.keys(tables).forEach((tableId) => {
      const table = tables[tableId]
      const result = table.find((row) => row.teamId === teamId)

      if (result) {
        total.played += result.played
        total.wins += result.wins
        total.draws += result.draws
        total.losses += result.losses
        total.for += result.for
        total.against += result.against
      }
    })

    return total
  }
}

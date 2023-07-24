const { tables, teams } = require('../../dataset')
const get = require('../../lib/object-get')

module.exports = function teamStatsHistoryModel(teamId) {
  const team = get(teams, teamId)

  if (team) {
    const history = []

    Object.keys(tables).forEach((tableId) => {
      const table = tables[tableId]
      const result = table.find((t) => t.teamId === teamId)

      if (result) {
        history.push({
          seasonId: tableId,
          ...result,
        })
      }
    })

    return history
  }
}

import { tables, teams } from '../dataset.js'
import get from '../lib/object-get.js'

export default function teamStatsHistoryModel(teamId) {
  const team = get(teams, teamId)
  const history = []

  if (team) {
    Object.keys(tables).forEach((tableId) => {
      const table = tables[tableId]
      const result = table.find((row) => row.teamId === teamId)

      if (result) {
        history.push({
          seasonId: tableId,
          ...result,
        })
      }
    })
  }

  return history
}

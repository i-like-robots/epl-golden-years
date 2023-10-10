import { tables, teams } from '../dataset.mjs'
import get from '../lib/object-get.mjs'

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

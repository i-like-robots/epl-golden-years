import { seasons, tables } from '../dataset.js'

export default function seasonsModel(filters = {}) {
  const filterFns = []
  const seasonIds = []

  if (filters.team) {
    filterFns.push((table) => table.some((row) => row.teamId === filters.team))
  }

  Object.keys(seasons).forEach((seasonId) => {
    const table = tables[seasonId]

    if (filterFns.every((filter) => filter(table))) {
      seasonIds.push(seasonId)
    }
  })

  return seasonIds
}

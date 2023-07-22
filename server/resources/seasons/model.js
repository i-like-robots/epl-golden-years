const { seasons, tables } = require('../../dataset')

module.exports = function seasonsModel(filters = {}) {
  const filterFns = []
  const seasonsData = []

  if (filters.team) {
    filterFns.push((table) => table.some((t) => t.teamId === filters.team))
  }

  Object.keys(seasons).forEach((seasonId) => {
    const table = tables[seasonId]

    if (filterFns.every((filter) => filter(table))) {
      seasonsData.push(seasonId)
    }
  })

  return seasonsData
}

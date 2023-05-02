const { tables } = require('../dataset')
const { seasonUrl } = require('../lib/urls')

module.exports = function seasonsRoute(request, response) {
  const { team } = request.query

  const filters = []
  const seasonsData = []

  if (team) {
    filters.push((table) => table.some((t) => t.teamId === team))
  }

  Object.keys(tables).forEach((seasonId) => {
    const table = tables[seasonId]

    if (filters.every((filter) => filter(table))) {
      seasonsData.push(seasonUrl(seasonId))
    }
  })

  response.send(seasonsData)
}

const { seasons } = require('../dataset')
const { seasonUrl } = require('../lib/urls')

module.exports = function seasonsRoute(request, response) {
  const { team } = request.query

  const filters = []
  const seasonsData = []

  if (team) {
    filters.push((table) => table.some((t) => t.teamId === team))
  }

  Object.keys(seasons).forEach((seasonId) => {
    const table = seasons[seasonId]

    if (filters.every((filter) => filter(table))) {
      seasonsData.push(seasonUrl(seasonId))
    }
  })

  response.send(seasonsData)
}

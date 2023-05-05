const { seasons } = require('../dataset')
const {
  seasonHatTricksUrl,
  seasonTableUrl,
  seasonTopScorersUrl,
  seasonTopAssistsUrl,
  seasonTopCleanSheetsUrl,
  seasonUrl,
} = require('../lib/urls')

module.exports = function seasonRoute(request, response) {
  const { seasonId } = request.params
  const season = seasons[seasonId]

  if (season) {
    const seasonIds = Object.keys(seasons)
    const seasonIndex = seasonIds.indexOf(seasonId)
    const nextId = seasonIds[seasonIndex + 1]
    const previousId = seasonIds[seasonIndex - 1]

    const seasonData = {
      ...season,
      table: seasonTableUrl(seasonId),
      topScorers: seasonTopScorersUrl(seasonId),
      topAssists: seasonTopAssistsUrl(seasonId),
      topCleanSheets: seasonTopCleanSheetsUrl(seasonId),
      hatTricks: seasonHatTricksUrl(seasonId),
      links: {
        previous: previousId ? seasonUrl(previousId) : null,
        next: nextId ? seasonUrl(nextId) : null,
      }
    }

    response.send(seasonData)
  } else {
    response.code(404)
    response.send({ error: 'Season not found' })
  }
}

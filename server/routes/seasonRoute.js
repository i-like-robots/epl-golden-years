const seasonModel = require('../resources/season/model')
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
  const season = seasonModel(seasonId)

  if (season) {
    const seasonData = {
      ...season,
      table: seasonTableUrl(seasonId),
      topScorers: seasonTopScorersUrl(seasonId),
      topAssists: seasonTopAssistsUrl(seasonId),
      topCleanSheets: seasonTopCleanSheetsUrl(seasonId),
      hatTricks: seasonHatTricksUrl(seasonId),
      links: {
        previous: season.previousId && seasonUrl(season.previousId),
        next: season.nextId && seasonUrl(season.nextId),
      },
    }

    response.send(seasonData)
  } else {
    response.code(404)
    response.send({ error: 'Season not found' })
  }
}

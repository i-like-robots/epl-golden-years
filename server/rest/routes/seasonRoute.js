const seasonModel = require('../../models/seasonModel')
const seasonLinksModel = require('../../models/seasonLinksModel')
const {
  seasonHatTricksUrl,
  seasonTableUrl,
  seasonTopScorersUrl,
  seasonTopAssistsUrl,
  seasonTopCleanSheetsUrl,
  seasonUrl,
} = require('../urls')

module.exports = function seasonRoute(request, response) {
  const { seasonId } = request.params
  const season = seasonModel(seasonId)

  if (season) {
    const links = seasonLinksModel(seasonId)

    response.send({
      ...season,
      table: seasonTableUrl(seasonId),
      topScorers: seasonTopScorersUrl(seasonId),
      topAssists: seasonTopAssistsUrl(seasonId),
      topCleanSheets: seasonTopCleanSheetsUrl(seasonId),
      hatTricks: seasonHatTricksUrl(seasonId),
      links: {
        previous: links.previousId ? seasonUrl(links.previousId) : null,
        next: links.nextId ? seasonUrl(links.nextId) : null,
      },
    })
  } else {
    response.code(404)
    response.send({ error: 'Season not found' })
  }
}

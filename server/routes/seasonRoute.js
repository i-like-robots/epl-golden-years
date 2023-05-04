const { seasons } = require('../dataset')
const {
  seasonHatTricksUrl,
  seasonTableUrl,
  seasonTopScorersUrl,
  seasonTopAssistsUrl,
} = require('../lib/urls')

module.exports = function seasonRoute(request, response) {
  const { seasonId } = request.params
  const season = seasons[seasonId]

  if (season) {
    const seasonData = {
      ...season,
      table: seasonTableUrl(seasonId),
      topScorers: seasonTopScorersUrl(seasonId),
      topAssists: seasonTopAssistsUrl(seasonId),
      hatTricks: seasonHatTricksUrl(seasonId),
    }

    response.send(seasonData)
  } else {
    response.code(404)
    response.send({ error: 'Season not found' })
  }
}

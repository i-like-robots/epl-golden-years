const { tables } = require('../dataset')
const { seasonTableUrl, seasonTopScorersUrl, seasonTopAssistsUrl } = require('../lib/urls')

module.exports = function seasonRoute(request, response) {
  const { seasonId } = request.params
  const table = tables[seasonId]

  if (table) {
    const seasonData = {
      table: seasonTableUrl(seasonId),
      topScorers: seasonTopScorersUrl(seasonId),
      topAssists: seasonTopAssistsUrl(seasonId),
    }

    response.json(seasonData)
  } else {
    response.sendStatus(404)
  }
}

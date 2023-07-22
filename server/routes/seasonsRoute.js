const seasonsModel = require('../resources/seasons/model')
const { seasonUrl } = require('../lib/urls')

module.exports = function seasonsRoute(request, response) {
  const { team } = request.query
  const seasonsData = seasonsModel({ team })

  response.send(seasonsData.map((seasonId) => seasonUrl(seasonId)))
}

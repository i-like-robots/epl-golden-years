const seasonsModel = require('../../resources/seasons/model')
const { seasonUrl } = require('../../lib/urls')

module.exports = function seasonsRoute(request, response) {
  const { team } = request.query
  const seasonsIds = seasonsModel({ team })

  response.send(seasonsIds.map((seasonId) => seasonUrl(seasonId)))
}

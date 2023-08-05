const seasonsModel = require('../../models/seasonsModel')
const { seasonUrl } = require('../urls')

module.exports = function seasonsRoute(request, response) {
  const { team } = request.query
  const seasonsIds = seasonsModel({ team })

  response.send(seasonsIds.map((seasonId) => seasonUrl(seasonId)))
}

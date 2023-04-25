const { tables } = require('../dataset')
const { seasonUrl } = require('../lib/urls')

function seasonsRouteHandler(request, response) {
  const seasonsData = Object.keys(tables).map((seasonId) => seasonUrl(seasonId))

  response.send(seasonsData)
}

module.exports = [seasonsRouteHandler]

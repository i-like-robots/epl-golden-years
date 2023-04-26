const { tables } = require('../dataset')
const { seasonUrl } = require('../lib/urls')

module.exports = function seasonsRoute(request, response) {
  const seasonsData = Object.keys(tables).map((seasonId) => seasonUrl(seasonId))

  response.send(seasonsData)
}

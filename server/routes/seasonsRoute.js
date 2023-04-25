const { tables } = require('../dataset')
const { seasonUrl } = require('../lib/urls')

const routeOptions = {}

function routeHandler(request, response) {
  const seasonsData = Object.keys(tables).map((seasonId) => seasonUrl(seasonId))

  response.send(seasonsData)
}

module.exports = { routeOptions, routeHandler }

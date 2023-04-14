const squads = require('../../data/squads.json')
const baseUrl = require('../lib/baseUrl')

module.exports = function squadsRoute(request, response) {
  const seasonIds = new Set(squads.map((squad) => squad.seasonId))

  const squadsData = Array.from(seasonIds).map((seasonId) => (
    {
      id: seasonId,
      rel: baseUrl(request, 'squads', seasonId)
    }
  ))

  response.json(squadsData)
}

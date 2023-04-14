const squads = require('../../data/squads.json')
const baseUrl = require('../lib/baseUrl')

module.exports = function squadsBySeasonRoute(request, response) {
  const seasonId = request.params.seasonId

  const squadsData = []

  squads.forEach((squad) => {
    if (squad.seasonId === seasonId) {
      acc.push({
        id: squad.teamId,
        rel: baseUrl(request, 'squads', seasonId, squad.teamId)
      })
    }
  })

  response.json(squadsData)
}

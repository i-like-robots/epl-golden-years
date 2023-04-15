const squads = require('../../data/squads.json')
const restfulUri = require('../lib/baseUrl')

module.exports = function teamSquadsRoute(request, response) {
  const { teamId } = request.params

  const squadsData = []

  squads.forEach((squad) => {
    if (squad.teamId === teamId) {
      squadsData.push(restfulUri(request, 'teams', teamId, 'squads', squad.seasonId))
    }
  })

  response.json(squadsData)
}

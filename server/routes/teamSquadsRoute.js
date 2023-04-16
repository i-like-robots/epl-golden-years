const { squads } = require('../dataset')
const { teamSquadUrl } = require('../lib/urls')

module.exports = function teamSquadsRoute(request, response) {
  const { teamId } = request.params

  const squadsData = []

  squads.forEach((squad) => {
    if (squad.teamId === teamId) {
      squadsData.push(teamSquadUrl(teamId, squad.seasonId))
    }
  })

  response.json(squadsData)
}

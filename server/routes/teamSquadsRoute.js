const squads = require('../../data/squads.json')
const teamSquadRoute = require('./teamSquadRoute')

module.exports = function teamSquadsRoute(request, response) {
  const { teamId } = request.params

  const squadsData = []

  squads.forEach((squad) => {
    if (squad.teamId === teamId) {
      squadsData.push(teamSquadRoute(teamId, squad.seasonId))
    }
  })

  response.json(squadsData)
}

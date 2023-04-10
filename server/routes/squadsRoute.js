const squads = require('../../data/squads.json')

module.exports = function squadsRoute(request, response) {
  const squadsData = squads.reduce((acc, squad) => {
    acc[squad.teamId] ??= []
    acc[squad.teamId].push(squad.seasonId)
    return acc
  }, {})

  response.json(squadsData)
}
const squads = require('../../data/squads.json')

module.exports = function squadsRoute(request, response) {
  const squadsData = squads.reduce((acc, squad) => {
    const { teamId, seasonId } = squad

    acc[teamId] ??= []
    acc[teamId].push({
      season: seasonId,
      rel: `${request.protocol}://${request.get('host')}/squads/${teamId}/${seasonId}`
    })

    return acc
  }, {})

  response.json(squadsData)
}
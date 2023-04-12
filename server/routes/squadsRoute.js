const squads = require('../../data/squads.json')
const baseUrl = require('../lib/baseUrl')

module.exports = function squadsRoute(request, response) {
  const squadsData = squads.reduce((acc, squad) => {
    const { teamId, seasonId } = squad

    acc.push({
      teamId,
      seasonId,
      rel: baseUrl(request, 'squads', teamId, seasonId)
    })

    return acc
  }, [])

  squadsData.sort((a, b) => {
    if (a.teamId > b.teamId) {
      return 1
    }

    if (a.teamId < b.teamId) {
      return -1
    }

    return 0
  })

  response.json(squadsData)
}

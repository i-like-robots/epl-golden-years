const squads = require('../../data/squads.json')
const baseUrl = require('../lib/baseUrl')

module.exports = function squadsRoute(request, response) {
  const seen = new Set()

  const squadsData = squads.reduce((acc, squad) => {
    const { seasonId } = squad

    if (!seen.has(seasonId)) {
      seen.add(seasonId)

      acc.push({
        id: seasonId,
        rel: baseUrl(request, 'squads', seasonId)
      })
    }

    return acc
  }, [])

  response.json(squadsData)
}

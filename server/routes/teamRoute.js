const { tables, teams } = require('../dataset')
const { seasonUrl, teamStatsUrl, teamSquadsUrl } = require('../lib/urls')

module.exports = function teamRoute(request, response) {
  const { teamId } = request.params
  const team = teams[teamId]

  if (team) {
    const seasons = []

    Object.keys(tables).forEach((seasonId) => {
      const playedInSeason = tables[seasonId].some((team) => team.teamId === teamId)

      if (playedInSeason) {
        seasons.push(seasonUrl(seasonId))
      }
    })

    const statistics = teamStatsUrl(teamId)

    const squads = teamSquadsUrl(teamId)

    response.send({ ...team, seasons, squads, statistics })
  } else {
    response.code(404)
    response.send({ error: 'Team not found' })
  }
}

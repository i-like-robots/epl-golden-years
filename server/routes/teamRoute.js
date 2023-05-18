const { tables, teams } = require('../dataset')
const { seasonUrl, teamStatsUrl, teamSquadsUrl } = require('../lib/urls')
const get = require('../lib/object-get')

module.exports = function teamRoute(request, response) {
  const { teamId } = request.params
  const team = get(teams, teamId)

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

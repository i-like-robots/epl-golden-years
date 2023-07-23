const teamModel = require('../resources/team/model')
const teamSeasonsModel = require('../resources/teamSeasons/model')
const { seasonUrl, teamStatsUrl, teamSquadsUrl } = require('../lib/urls')

module.exports = function teamRoute(request, response) {
  const { teamId } = request.params
  const team = teamModel(teamId)

  if (team) {
    const seasons = teamSeasonsModel(teamId).map((seasonId) => seasonUrl(seasonId))

    const squads = teamSquadsUrl(teamId)

    const statistics = teamStatsUrl(teamId)

    response.send({ ...team, seasons, squads, statistics })
  } else {
    response.code(404)
    response.send({ error: 'Team not found' })
  }
}

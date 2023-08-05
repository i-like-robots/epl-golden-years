const teamModel = require('../../models/teamModel')
const teamSeasonsModel = require('../../models/teamSeasonsModel')
const { seasonUrl, teamStatsUrl, teamSquadsUrl } = require('../urls')

module.exports = function teamRoute(request, response) {
  const { teamId } = request.params
  const team = teamModel(teamId)

  if (team) {
    const seasons = teamSeasonsModel(teamId).map((seasonId) => seasonUrl(seasonId))

    const squads = teamSquadsUrl(teamId)

    const stats = teamStatsUrl(teamId)

    response.send({ ...team, seasons, squads, stats })
  } else {
    response.code(404)
    response.send({ error: 'Team not found' })
  }
}

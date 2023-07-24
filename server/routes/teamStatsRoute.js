const teamStatsModel = require('../resources/teamStats/model')
const teamStatsHistory = require('../resources/teamStatsHistory/model')
const { teamUrl, seasonUrl } = require('../lib/urls')

module.exports = function teamStatsRoute(request, response) {
  const { teamId } = request.params
  const stats = teamStatsModel(teamId)

  if (stats) {
    const history = teamStatsHistory(teamId).map((history) => ({
      ...history,
      season: seasonUrl(history.seasonId),
    }))

    response.send({ team: teamUrl(teamId), total: stats, history })
  } else {
    response.code(404)
    response.send({ error: 'Team not found' })
  }
}

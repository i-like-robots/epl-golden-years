const teamStatsModel = require('../../models/teamStatsModel')
const teamStatsHistory = require('../../models/teamStatsHistoryModel')
const { teamUrl, seasonUrl } = require('../../lib/urls')

module.exports = function teamStatsRoute(request, response) {
  const { teamId } = request.params
  const stats = teamStatsModel(teamId)

  if (stats) {
    const history = teamStatsHistory(teamId).map((record) => ({
      ...record,
      season: seasonUrl(record.seasonId),
    }))

    response.send({ team: teamUrl(teamId), total: stats, history })
  } else {
    response.code(404)
    response.send({ error: 'Team not found' })
  }
}

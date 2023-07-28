const teamSquadsModel = require('../../models/teamSquadsModel')
const { teamSquadUrl, teamUrl } = require('../../lib/urls')

module.exports = function teamSquadsRoute(request, response) {
  const { teamId } = request.params
  const squads = teamSquadsModel(teamId)

  if (squads.length) {
    const data = squads.map(({ seasonId }) => teamSquadUrl(teamId, seasonId))
    response.send({ team: teamUrl(teamId), squads: data })
  } else {
    response.code(404)
    response.send({ error: 'Team not found' })
  }
}

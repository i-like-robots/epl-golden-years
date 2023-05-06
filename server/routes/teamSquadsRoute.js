const { squads } = require('../dataset')
const { teamSquadUrl, teamUrl } = require('../lib/urls')

module.exports = function teamSquadsRoute(request, response) {
  const { teamId } = request.params

  const data = []

  squads.forEach((squad) => {
    if (squad.teamId === teamId) {
      data.push(teamSquadUrl(teamId, squad.seasonId))
    }
  })

  if (data.length) {
    response.send({ team: teamUrl(teamId), squads: data })
  } else {
    response.code(404)
    response.send({ error: 'Team not found' })
  }
}

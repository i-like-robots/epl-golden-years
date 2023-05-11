const { managers } = require('../dataset')
const { seasonUrl, teamUrl } = require('../lib/urls')

module.exports = function managerRoute(request, response) {
  const { managerId } = request.params
  const manager = managers[managerId]

  if (manager) {
    const history = manager.history.map(({ seasonId, teamId }) => ({
      season: seasonUrl(seasonId),
      team: teamUrl(teamId),
    }))

    response.send({ ...manager, history })
  } else {
    response.code(404)
    response.send({ error: 'Manager not found' })
  }
}

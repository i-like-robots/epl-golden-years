const { teams } = require('../dataset')
const { teamUrl } = require('../lib/urls')

module.exports = function teamsRoute(request, response) {
  const teamsData = Object.keys(teams).map((teamId) => teamUrl(teamId))

  response.json(teamsData)
}

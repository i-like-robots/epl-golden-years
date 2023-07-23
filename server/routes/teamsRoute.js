const teamsModel = require('../resources/teams/model')
const { teamUrl } = require('../lib/urls')

module.exports = function teamsRoute(request, response) {
  const { name } = request.query
  const teamsData = teamsModel({ name })

  response.send(teamsData.map((teamId) => teamUrl(teamId)))
}

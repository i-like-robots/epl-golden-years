const teamsModel = require('../../resources/teams/model')
const { teamUrl } = require('../../lib/urls')

module.exports = function teamsRoute(request, response) {
  const { name } = request.query
  const teamIds = teamsModel({ name })

  response.send(teamIds.map((teamId) => teamUrl(teamId)))
}

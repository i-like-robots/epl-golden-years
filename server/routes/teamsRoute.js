const { teamUrl } = require('../lib/urls')
const teams = require('../../data/teams.json')

module.exports = function teamsRoute(request, response) {
  const teamsData = Object.keys(teams).map((teamId) => teamUrl(teamId))

  response.json(teamsData)
}

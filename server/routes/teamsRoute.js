const teams = require('../../data/teams.json')
const baseUrl = require('../lib/baseUrl')

module.exports = function teamsRoute(request, response) {
  const teamIds = Object.keys(teams)
  const teamsData = teamIds.map((teamId) => (
    {
      id: teamId,
      rel: baseUrl(request, 'teams', teamId),
    }
  ))

  response.json(teamsData)
}

const teams = require('../../data/teams.json')

module.exports = function teamsRoute(request, response) {
  const teamIds = Object.keys(teams)
  const teamsData = teamIds.map((teamId) => (
    {
      id: teamId,
      rel: `${request.protocol}://${request.get('host')}/teams/${teamId}`
    }
  ))

  response.json(teamsData)
}

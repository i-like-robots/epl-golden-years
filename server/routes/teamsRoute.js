const teams = require('../../data/teams.json')

module.exports = function teamsRoute(request, response) {
  const teamIds = Object.keys(teams)
  const teamsData = teamIds.reduce((acc, teamId) => {
    acc[teamId] = teams[teamId].name
    return acc
  }, {})

  response.json(teamsData)
}

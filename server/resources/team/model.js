const { teams } = require('../../dataset')
const get = require('../../lib/object-get')

module.exports = function teamModel(teamId) {
  const team = get(teams, teamId)

  if (team) {
    return team
  }
}

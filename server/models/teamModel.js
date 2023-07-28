const { teams } = require('../dataset')
const get = require('../lib/object-get')

module.exports = function teamModel(teamId) {
  return get(teams, teamId)
}

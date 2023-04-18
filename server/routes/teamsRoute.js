const { teams } = require('../dataset')
const { teamUrl } = require('../lib/urls')
const matches = require('../lib/object-search')

const SEARCH_PROPS = ['name', 'shortName']

module.exports = function teamsRoute(request, response) {
  const matcher = matches(request.query.search)
  const teamsData = []

  Object.keys(teams).forEach((teamId) => {
    const team = teams[teamId]

    if (typeof matcher === 'function' ? matcher(team, SEARCH_PROPS) : true) {
      teamsData.push(teamUrl(teamId))
    }
  })

  response.send(teamsData)
}

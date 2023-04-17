const { teams } = require('../dataset')
const { teamUrl } = require('../lib/urls')
const matches = require('../lib/object-matches')

const SEARCH_PATTERN = /^[a-z]+$/i

const SEARCH_FIELDS = ['name', 'shortName']

const isSearchValid = (search) => search && SEARCH_PATTERN.test(search)

module.exports = function teamsRoute(request, response) {
  const { search } = request.query
  const matcher = isSearchValid(search) ? matches(search) : null
  const teamsData = []

  Object.keys(teams).forEach((teamId) => {
    const team = teams[teamId]

    if (matcher ? matcher(team, SEARCH_FIELDS) : true) {
      teamsData.push(teamUrl(teamId))
    }
  })

  response.send(teamsData)
}

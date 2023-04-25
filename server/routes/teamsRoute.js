const { teams } = require('../dataset')
const { teamUrl } = require('../lib/urls')
const search = require('../lib/object-search')

const NAME_PROPS = ['name', 'shortName']

const routeOptions = {
  schema: {
    query: {
      name: {
        type: 'string',
        pattern: '^\\w+$',
      },
    },
  },
}

function routeHandler(request, response) {
  const { name } = request.query

  const filters = []
  const teamsData = []

  if (name) {
    const fn = search(name)
    filters.push((player) => fn(player, NAME_PROPS))
  }

  Object.keys(teams).forEach((teamId) => {
    const team = teams[teamId]

    if (filters.every((filter) => filter(team))) {
      teamsData.push(teamUrl(teamId))
    }
  })

  response.send(teamsData)
}

module.exports = { routeOptions, routeHandler }

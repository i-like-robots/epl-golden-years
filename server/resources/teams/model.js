const { teams } = require('../../dataset')
const search = require('../../lib/object-search')

const NAME_PROPS = ['name', 'shortName']

module.exports = function teamsModel(filters = {}) {
  const filterFns = []
  const teamsData = []

  if (filters.name) {
    const fn = search(filters.name)
    filterFns.push((player) => fn(player, NAME_PROPS))
  }

  Object.keys(teams).forEach((teamId) => {
    const team = teams[teamId]

    if (filterFns.every((filter) => filter(team))) {
      teamsData.push(teamId)
    }
  })

  return teamsData
}

import { teams } from '../dataset.mjs'
import search from '../lib/object-search.mjs'

const NAME_PROPS = ['name', 'shortName']

export default function teamsModel(filters = {}) {
  const filterFns = []
  const teamIds = []

  if (filters.name) {
    const fn = search(filters.name)
    filterFns.push((player) => fn(player, NAME_PROPS))
  }

  Object.keys(teams).forEach((teamId) => {
    const team = teams[teamId]

    if (filterFns.every((filter) => filter(team))) {
      teamIds.push(teamId)
    }
  })

  return teamIds
}

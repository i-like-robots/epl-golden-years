import { managers } from '../dataset.js'
import search from '../lib/object-search.js'

const NAME_PROPS = ['displayName', 'firstName', 'lastName']

export default function managersModel(filters = {}) {
  const filterFns = []
  const managerIds = []

  if (filters.name) {
    const fn = search(filters.name)
    filterFns.push((manager) => fn(manager, NAME_PROPS))
  }

  Object.keys(managers).forEach((managerId) => {
    const manager = managers[managerId]

    if (filterFns.every((filterFn) => filterFn(manager))) {
      managerIds.push(managerId)
    }
  })

  return managerIds
}

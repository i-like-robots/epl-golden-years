const { managers } = require('../../dataset')
const search = require('../../lib/object-search')

const NAME_PROPS = ['displayName', 'firstName', 'lastName']

module.exports = function managersModel(filters = {}) {
  const filterFns = []
  const managersData = []

  if (filters.name) {
    const fn = search(filters.name)
    filterFns.push((player) => fn(player, NAME_PROPS))
  }

  Object.keys(managers).forEach((managerId) => {
    const manager = managers[managerId]

    if (filterFns.every((filterFn) => filterFn(manager))) {
      managersData.push(managerId)
    }
  })

  return managersData
}

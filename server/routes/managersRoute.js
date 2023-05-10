const { managers } = require('../dataset')
const { managerUrl } = require('../lib/urls')
const search = require('../lib/object-search')

const NAME_PROPS = ['displayName', 'firstName', 'lastName']

module.exports = function managersRoute(request, response) {
  const { name } = request.query

  const filters = []
  const managersData = []

  if (name) {
    const fn = search(name)
    filters.push((player) => fn(player, NAME_PROPS))
  }

  Object.keys(managers).forEach((managerId) => {
    const manager = managers[managerId]

    if (filters.every((filter) => filter(manager))) {
      managersData.push(managerUrl(managerId))
    }
  })

  response.send(managersData)
}

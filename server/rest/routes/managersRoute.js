const managersModel = require('../../resources/managers/model')
const { managerUrl } = require('../../lib/urls')

module.exports = function managersRoute(request, response) {
  const { name } = request.query
  const managerIds = managersModel({ name })

  response.send(managerIds.map((managerId) => managerUrl(managerId)))
}

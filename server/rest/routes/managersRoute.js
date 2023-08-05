const managersModel = require('../../models/managersModel')
const { managerUrl } = require('../urls')

module.exports = function managersRoute(request, response) {
  const { name } = request.query
  const managerIds = managersModel({ name })

  response.send(managerIds.map((managerId) => managerUrl(managerId)))
}

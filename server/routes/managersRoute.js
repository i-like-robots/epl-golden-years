const managersModel = require('../resources/managers/model')
const { managerUrl } = require('../lib/urls')

module.exports = function managersRoute(request, response) {
  const { name } = request.query
  const managersData = managersModel({ name })

  response.send(managersData.map((managerId) => managerUrl(managerId)))
}

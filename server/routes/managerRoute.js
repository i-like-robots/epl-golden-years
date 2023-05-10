const { managers } = require('../dataset')

module.exports = function managerRoute(request, response) {
  const { managerId } = request.params
  const manager = managers[managerId]

  if (manager) {
    response.send(manager)
  } else {
    response.code(404)
    response.send({ error: 'Manager not found' })
  }
}

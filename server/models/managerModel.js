const { managers } = require('../dataset')
const get = require('../lib/object-get')

module.exports = function managerModel(managerId) {
  return get(managers, managerId)
}

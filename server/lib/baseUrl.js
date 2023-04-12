const urlJoin = require('url-join')

module.exports = function baseUrl(request, ...paths) {
  return urlJoin(`${request.protocol}://${request.get('host')}`, ...paths)
}

const { playersUrl, teamsUrl, seasonsUrl, managersUrl } = require('../../lib/urls')

module.exports = function rootRoute(_, response) {
  response.send({
    players: playersUrl(),
    teams: teamsUrl(),
    seasons: seasonsUrl(),
    managers: managersUrl(),
  })
}

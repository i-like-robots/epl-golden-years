const { playersUrl, teamsUrl, seasonsUrl } = require('../lib/urls')

module.exports = function rootRoute(_, response) {
  response.send({
    players: playersUrl(),
    teams: teamsUrl(),
    seasons: seasonsUrl(),
  })
}

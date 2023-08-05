const { playersUrl, teamsUrl, seasonsUrl, managersUrl } = require('../urls')

module.exports = function rootRoute(_, response) {
  response.send({
    players: playersUrl(),
    teams: teamsUrl(),
    seasons: seasonsUrl(),
    managers: managersUrl(),
  })
}

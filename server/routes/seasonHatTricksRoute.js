const { hatTricks } = require('../dataset')
const { playerUrl, seasonUrl, teamUrl } = require('../lib/urls')

module.exports = function seasonHatTricksRoute(request, response) {
  const { seasonId } = request.params

  const players = hatTricks.filter((hatTrick) => hatTrick.seasonId === seasonId)

  if (players.length) {
    const hatTricksData = players.map((player) => ({
      player: playerUrl(player.playerId),
      season: seasonUrl(player.seasonId),
      homeTeam: teamUrl(player.homeTeamId),
      awayTeam: teamUrl(player.awayTeamId),
    }))

    response.send(hatTricksData)
  } else {
    response.sendStatus(404)
  }
}

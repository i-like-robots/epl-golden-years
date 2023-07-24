const seasonHatTricksModel = require('../resources/seasonHatTricks/model')
const { playerUrl, seasonUrl, teamUrl } = require('../lib/urls')

module.exports = function seasonHatTricksRoute(request, response) {
  const { seasonId } = request.params
  const hatTricks = seasonHatTricksModel(seasonId)

  if (hatTricks) {
    const data = []

    hatTricks.map((hatTrick) => ({
      player: playerUrl(hatTrick.playerId),
      homeTeam: teamUrl(hatTrick.homeTeamId),
      awayTeam: teamUrl(hatTrick.awayTeamId),
      date: hatTrick.date,
    }))

    response.send({ season: seasonUrl(seasonId), hatTricks: data })
  } else {
    response.code(404)
    response.send({ error: 'Season not found' })
  }
}

const { hatTricks, tables } = require('../dataset')
const { playerUrl, seasonUrl, teamUrl } = require('../lib/urls')

module.exports = function seasonHatTricksRoute(request, response) {
  const { seasonId } = request.params
  const table = tables[seasonId]

  if (table) {
    const data = hatTricks.filter((hatTrick) => hatTrick.seasonId === seasonId).map((hatTrick) => (
      {
        player: playerUrl(hatTrick.playerId),
        homeTeam: teamUrl(hatTrick.homeTeamId),
        awayTeam: teamUrl(hatTrick.awayTeamId),
        date: hatTrick.date,
      }
    ))

    response.send({ season: seasonUrl(seasonId), hatTricks: data })
  } else {
    response.code(404)
    response.send({ error: 'Season not found' })
  }
}

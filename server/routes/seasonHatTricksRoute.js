const { hatTricks, tables } = require('../dataset')
const { playerUrl, seasonUrl, teamUrl } = require('../lib/urls')
const get = require('../lib/object-get')

module.exports = function seasonHatTricksRoute(request, response) {
  const { seasonId } = request.params
  const table = get(tables, seasonId)

  if (table) {
    const data = []

    hatTricks.forEach((hatTrick) => {
      if (hatTrick.seasonId === seasonId) {
        data.push({
          player: playerUrl(hatTrick.playerId),
          homeTeam: teamUrl(hatTrick.homeTeamId),
          awayTeam: teamUrl(hatTrick.awayTeamId),
          date: hatTrick.date,
        })
      }
    })

    response.send({ season: seasonUrl(seasonId), hatTricks: data })
  } else {
    response.code(404)
    response.send({ error: 'Season not found' })
  }
}

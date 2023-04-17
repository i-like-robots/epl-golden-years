const { hatTricks, tables } = require('../dataset')
const { playerUrl, seasonUrl, teamUrl } = require('../lib/urls')

module.exports = function seasonHatTricksRoute(request, response) {
  const { seasonId } = request.params
  const table = tables[seasonId]

  if (table) {
    const events = hatTricks.filter((hatTrick) => hatTrick.seasonId === seasonId)

    const date = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeZone: 'Europe/London' })

    const data = events.map((event) => (
      {
        player: playerUrl(event.playerId),
        season: seasonUrl(event.seasonId),
        homeTeam: teamUrl(event.homeTeamId),
        awayTeam: teamUrl(event.awayTeamId),
        date: date.format(new Date(event.date)),
      }
    ))

    response.send({ season: seasonUrl(seasonId), data })
  } else {
    response.code(404)
    response.send({ error: 'Season not found' })
  }
}

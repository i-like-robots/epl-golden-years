const { tables, teams } = require('../dataset')
const { seasonUrl, teamSquadUrl } = require('../lib/urls')
const omit = require('../lib/object-omit')

module.exports = function teamRoute(request, response) {
  const { teamId } = request.params
  const team = teams[teamId]

  if (team) {
    const seasonIds = Object.keys(tables).filter((seasonId) =>
      tables[seasonId].some((t) => t.teamId === teamId)
    )

    const history = []

    const stats = {
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      for: 0,
      against: 0,
    }

    seasonIds.forEach((seasonId) => {
      const result = tables[seasonId].find((t) => t.teamId === teamId)

      history.push({
        season: seasonUrl(seasonId),
        squad: teamSquadUrl(teamId, seasonId),
      })

      stats.played += result.played
      stats.wins += result.wins
      stats.draws += result.draws
      stats.losses += result.losses
      stats.for += result.for
      stats.against += result.against
    })

    response.send({ ...omit(team, 'teamId'), history, stats })
  } else {
    response.sendStatus(404)
  }
}
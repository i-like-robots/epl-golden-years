const { tables, teams } = require('../dataset')
const { teamUrl, seasonUrl } = require('../lib/urls')
const pick = require('../lib/object-pick')

module.exports = function teamStatsRoute(request, response) {
  const { teamId } = request.params
  const team = teams[teamId]

  if (team) {
    const seasonIds = Object.keys(tables).filter((seasonId) =>
      tables[seasonId].some((t) => t.teamId === teamId)
    )

    const total = {
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      for: 0,
      against: 0,
    }

    const history = []

    seasonIds.forEach((seasonId) => {
      const result = tables[seasonId].find((t) => t.teamId === teamId)

      history.push({
        season: seasonUrl(seasonId),
        ...pick(result, 'played', 'wins', 'draws', 'losses', 'for', 'against'),
      })

      total.played += result.played
      total.wins += result.wins
      total.draws += result.draws
      total.losses += result.losses
      total.for += result.for
      total.against += result.against
    })

    response.send({ team: teamUrl(teamId), total, history })
  } else {
    response.code(404)
    response.send({ error: 'Team not found' })
  }
}

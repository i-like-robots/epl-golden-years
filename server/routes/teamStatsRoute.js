const { tables, teams } = require('../dataset')
const { teamUrl } = require('../lib/urls')

module.exports = function teamRoute(request, response) {
  const { teamId } = request.params
  const team = teams[teamId]

  if (team) {
    const seasonIds = Object.keys(tables).filter((seasonId) =>
      tables[seasonId].some((t) => t.teamId === teamId)
    )

    const statistics = {
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      for: 0,
      against: 0,
    }

    seasonIds.forEach((seasonId) => {
      const result = tables[seasonId].find((t) => t.teamId === teamId)

      statistics.played += result.played
      statistics.wins += result.wins
      statistics.draws += result.draws
      statistics.losses += result.losses
      statistics.for += result.for
      statistics.against += result.against
    })

    response.send({ team: teamUrl(teamId), statistics })
  } else {
    response.code(404)
    response.send({ error: 'Team not found' })
  }
}
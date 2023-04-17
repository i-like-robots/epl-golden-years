const { tables, teams } = require('../dataset')
const { teamUrl } = require('../lib/urls')

module.exports = function teamRoute(request, response) {
  const { teamId } = request.params
  const team = teams[teamId]

  if (team) {
    const seasonIds = Object.keys(tables).filter((seasonId) =>
      tables[seasonId].some((t) => t.teamId === teamId)
    )

    const data = {
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      for: 0,
      against: 0,
    }

    seasonIds.forEach((seasonId) => {
      const result = tables[seasonId].find((t) => t.teamId === teamId)

      data.played += result.played
      data.wins += result.wins
      data.draws += result.draws
      data.losses += result.losses
      data.for += result.for
      data.against += result.against
    })

    response.send({ team: teamUrl(teamId), statistics: data })
  } else {
    response.code(404)
    response.send({ error: 'Team not found' })
  }
}
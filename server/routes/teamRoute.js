const teams = require('../../data/teams.json')
const tables = require('../../data/tables.json')

module.exports = function teamRoute(request, response) {
  const teamId = request.params.teamId
  const team = teams[teamId]

  if (team) {
    const resultHistory = Object.keys(tables).filter((seasonId) =>
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

    resultHistory.forEach((seasonId) => {
      const result = tables[seasonId].find((t) => t.teamId === teamId)

      history.push({ seasonId, ...result, teamId: undefined })

      stats.played += result.played
      stats.wins += result.wins
      stats.draws += result.draws
      stats.losses += result.losses
      stats.for += result.for
      stats.against += result.against
    })

    response.json({ ...team, history, stats })
  } else {
    response.sendStatus(404)
  }
}
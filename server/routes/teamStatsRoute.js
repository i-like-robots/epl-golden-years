const { tables, teams } = require('../dataset')
const { teamUrl, seasonUrl } = require('../lib/urls')
const pick = require('../lib/object-pick')
const get = require('../lib/object-get')

module.exports = function teamStatsRoute(request, response) {
  const { teamId } = request.params
  const team = get(teams, teamId)

  if (team) {
    const total = {
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      for: 0,
      against: 0,
    }

    const history = []

    Object.keys(tables).forEach((tableId) => {
      const table = tables[tableId]
      const result = table.find((t) => t.teamId === teamId)

      if (result) {
        history.push({
          season: seasonUrl(tableId),
          ...pick(result, 'played', 'wins', 'draws', 'losses', 'for', 'against'),
        })

        total.played += result.played
        total.wins += result.wins
        total.draws += result.draws
        total.losses += result.losses
        total.for += result.for
        total.against += result.against
      }
    })

    response.send({ team: teamUrl(teamId), total, history })
  } else {
    response.code(404)
    response.send({ error: 'Team not found' })
  }
}

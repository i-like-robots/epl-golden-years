const { players, squads, hatTricks } = require('../dataset')
const { playerUrl, seasonUrl } = require('../lib/urls')
const pick = require('../lib/object-pick')
const get = require('../lib/object-get')

module.exports = function playerStatsRoute(request, response) {
  const { playerId } = request.params
  const player = get(players, playerId)

  if (player) {
    const squadHistory = squads.filter((squad) =>
      squad.players.some((p) => p.playerId === playerId)
    )

    const hatTrickHistory = hatTricks.filter((h) => h.playerId === playerId)

    const total = {
      appearances: 0,
      goals: 0,
      assists: 0,
      cleanSheets: 0,
      hatTricks: hatTrickHistory.length,
    }

    const history = []

    squadHistory.forEach((squad) => {
      const member = squad.players.find((p) => p.playerId === playerId)

      history.push({
        season: seasonUrl(squad.seasonId),
        ...pick(member, 'appearances', 'goals', 'assists', 'cleanSheets'),
        hatTricks: hatTrickHistory.filter((h) => h.seasonId === squad.seasonId).length,
      })

      total.appearances += member.appearances
      total.goals += member.goals
      total.assists += member.assists
      total.cleanSheets += member.cleanSheets
    })

    response.send({ player: playerUrl(playerId), total, history })
  } else {
    response.code(404)
    response.send({ error: 'Player not found' })
  }
}

const { players, squads, hatTricks } = require('../dataset')
const { playerUrl, seasonUrl } = require('../lib/urls')
const pick = require('../lib/object-pick')
const get = require('../lib/object-get')

module.exports = function playerStatsRoute(request, response) {
  const { playerId } = request.params
  const player = get(players, playerId)

  if (player) {
    const total = {
      appearances: 0,
      goals: 0,
      assists: 0,
      cleanSheets: 0,
      hatTricks: 0,
    }

    const hatTricksBySeason = hatTricks.reduce((acc, hatTrick) => {
      if (hatTrick.playerId === playerId) {
        acc[hatTrick.seasonId] ??= 0
        acc[hatTrick.seasonId]++
      }

      return acc
    }, {})

    const history = []

    squads.forEach((squad) => {
      const member = squad.players.find((p) => p.playerId === playerId)

      if (member) {
        const seasonHatTricks = hatTricksBySeason[squad.seasonId] || 0

        history.push({
          season: seasonUrl(squad.seasonId),
          ...pick(member, 'appearances', 'goals', 'assists', 'cleanSheets'),
          hatTricks: seasonHatTricks,
        })

        total.appearances += member.appearances
        total.goals += member.goals
        total.assists += member.assists
        total.cleanSheets += member.cleanSheets
        total.hatTricks += seasonHatTricks
      }
    })

    response.send({ player: playerUrl(playerId), total, history })
  } else {
    response.code(404)
    response.send({ error: 'Player not found' })
  }
}

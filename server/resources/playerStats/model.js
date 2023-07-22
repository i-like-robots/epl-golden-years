const { players, squads, hatTricks } = require('../../dataset')
const get = require('../../lib/object-get')

function getHatTricksBySeason(playerId) {
  return hatTricks.reduce((acc, hatTrick) => {
    if (hatTrick.playerId === playerId) {
      acc[hatTrick.seasonId] ??= 0
      acc[hatTrick.seasonId]++
    }

    return acc
  }, {})
}

module.exports = function playerStatsModel(playerId) {
  const player = get(players, playerId)

  if (player) {
    const hatTricksBySeason = getHatTricksBySeason(playerId)

    // TODO: refactor into { [seasonId]: stats }
    const history = []

    const total = {
      appearances: 0,
      goals: 0,
      assists: 0,
      cleanSheets: 0,
      hatTricks: 0,
    }

    squads.forEach((squad) => {
      const member = squad.players.find((p) => p.playerId === playerId)

      if (member) {
        const seasonHatTricks = hatTricksBySeason[squad.seasonId] || 0

        history.push({
          seasonId: squad.seasonId,
          appearances: member.appearances,
          goals: member.goals,
          assists: member.assists,
          cleanSheets: member.cleanSheets,
          hatTricks: seasonHatTricks,
        })

        total.appearances += member.appearances
        total.goals += member.goals
        total.assists += member.assists
        total.cleanSheets += member.cleanSheets
        total.hatTricks += seasonHatTricks
      }
    })

    return { history, total }
  }
}

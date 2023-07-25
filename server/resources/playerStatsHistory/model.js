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

module.exports = function playerStatsHistoryModel(playerId) {
  const player = get(players, playerId)
  const history = []

  if (player) {
    const hatTricksBySeason = getHatTricksBySeason(playerId)

    squads.forEach((squad) => {
      const member = squad.players.find((player) => player.playerId === playerId)

      if (member) {
        history.push({
          seasonId: squad.seasonId,
          appearances: member.appearances,
          goals: member.goals,
          assists: member.assists,
          cleanSheets: member.cleanSheets,
          hatTricks: hatTricksBySeason[squad.seasonId] ?? 0,
        })
      }
    })
  }

  return history
}

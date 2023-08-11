const { players, squads, hatTricks } = require('../dataset')
const get = require('../lib/object-get')

function countHatTricks(playerId) {
  const list = hatTricks.filter((hatTrick) => hatTrick.playerId === playerId)
  return list.length
}

module.exports = function playerStatsModel(playerId) {
  const player = get(players, playerId)

  if (player) {
    const total = {
      appearances: 0,
      goals: 0,
      assists: 0,
      cleanSheets: 0,
      hatTricks: countHatTricks(playerId),
    }

    squads.forEach((squad) => {
      const member = squad.players.find((player) => player.playerId === playerId)

      if (member) {
        total.appearances += member.appearances
        total.goals += member.goals
        total.assists += member.assists
        total.cleanSheets += member.cleanSheets
      }
    })

    return total
  }
}

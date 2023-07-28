const { players, squads, hatTricks } = require('../dataset')
const get = require('../lib/object-get')

module.exports = function playerStatsModel(playerId) {
  const player = get(players, playerId)

  if (player) {
    const total = {
      appearances: 0,
      goals: 0,
      assists: 0,
      cleanSheets: 0,
      hatTricks: 0,
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

    total.hatTricks = hatTricks.filter((hatTrick) => hatTrick.playerId === playerId).length

    return total
  }
}

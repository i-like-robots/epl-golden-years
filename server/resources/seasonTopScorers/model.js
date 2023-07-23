const { squads, seasons } = require('../../dataset')
const pick = require('../../lib/object-pick')
const get = require('../../lib/object-get')

module.exports = function seasonTopScorersModel(seasonId) {
  const season = get(seasons, seasonId)

  if (season) {
    const data = []

    squads.forEach((squad) => {
      if (squad.seasonId === seasonId) {
        squad.players.forEach((player) => {
          if (player.goals) {
            data.push(player)
          }
        })
      }
    })

    data.sort((a, b) => {
      if (a.goals > b.goals) return -1
      if (a.goals < b.goals) return 1
      if (a.appearances > b.appearances) return 1
      if (a.appearances < b.appearances) return -1

      return 0
    })

    return data.slice(0, 10).map((player) => ({
      ...pick(player, 'playerId', 'goals', 'appearances'),
      minutesPerGoal: Math.round((player.appearances * 90) / player.goals),
    }))
  }
}

const { squads } = require('../dataset')

function sortByGoals(a, b) {
  if (a.goals > b.goals) return -1
  if (a.goals < b.goals) return 1
  if (a.appearances > b.appearances) return 1
  if (a.appearances < b.appearances) return -1

  return 0
}

module.exports = function seasonTopScorersModel(seasonId) {
  const unique = {}

  squads.forEach((squad) => {
    if (squad.seasonId !== seasonId) {
      return
    }

    squad.players.forEach((player) => {
      if (player.goals === 0) {
        return
      }

      unique[player.playerId] ??= {
        playerId: player.playerId,
        goals: 0,
        appearances: 0,
      }

      unique[player.playerId].goals += player.goals
      unique[player.playerId].appearances += player.appearances
    })
  })

  const draft = Array.from(Object.values(unique))

  draft.sort(sortByGoals)

  return draft.slice(0, 10).map((player) => ({
    ...player,
    minutesPerGoal: Math.round((player.appearances * 90) / player.goals),
  }))
}

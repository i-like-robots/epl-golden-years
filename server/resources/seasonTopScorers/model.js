const { squads } = require('../../dataset')

function sortByGoals(a, b) {
  if (a.goals > b.goals) return -1
  if (a.goals < b.goals) return 1
  if (a.appearances > b.appearances) return 1
  if (a.appearances < b.appearances) return -1

  return 0
}

module.exports = function seasonTopScorersModel(seasonId) {
  const draft = []

  squads.forEach((squad) => {
    if (squad.seasonId === seasonId) {
      squad.players.forEach((player) => {
        if (player.goals) {
          draft.push(player)
        }
      })
    }
  })

  // TODO: merge players if needed, i.e. they transferred
  draft.sort(sortByGoals)

  return draft.slice(0, 10).map((player) => ({
    ...player,
    minutesPerGoal: Math.round((player.appearances * 90) / player.goals),
  }))
}

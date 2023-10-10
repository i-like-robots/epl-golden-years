import { squads } from '../dataset.js'

function sortByGoals(a, b) {
  if (a.goals > b.goals) return -1
  if (a.goals < b.goals) return 1
  if (a.appearances > b.appearances) return 1
  if (a.appearances < b.appearances) return -1

  return 0
}

export default function seasonTopScorersModel(seasonId) {
  const records = {}

  squads.forEach((squad) => {
    if (squad.seasonId !== seasonId) {
      return
    }

    squad.players.forEach((player) => {
      if (player.goals === 0) {
        return
      }

      const record = (records[player.playerId] ??= {
        playerId: player.playerId,
        goals: 0,
        appearances: 0,
      })

      record.goals += player.goals
      record.appearances += player.appearances
    })
  })

  const draft = Array.from(Object.values(records))

  draft.sort(sortByGoals)

  return draft.slice(0, 10).map((player) => ({
    ...player,
    minutesPerGoal: Math.round((player.appearances * 90) / player.goals),
  }))
}

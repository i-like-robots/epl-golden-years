import { squads } from '../dataset.js'

function sortByAssists(a, b) {
  if (a.assists > b.assists) return -1
  if (a.assists < b.assists) return 1
  if (a.appearances > b.appearances) return 1
  if (a.appearances < b.appearances) return -1

  return 0
}

export default function seasonTopAssistsModel(seasonId) {
  const records = {}

  squads.forEach((squad) => {
    if (squad.seasonId !== seasonId) {
      return
    }

    squad.players.forEach((player) => {
      if (player.assists === 0) {
        return
      }

      const record = (records[player.playerId] ??= {
        playerId: player.playerId,
        assists: 0,
        appearances: 0,
      })

      record.assists += player.assists
      record.appearances += player.appearances
    })
  })

  const draft = Array.from(Object.values(records))

  draft.sort(sortByAssists)

  return draft.slice(0, 10).map((player) => ({
    ...player,
    minutesPerAssist: Math.round((player.appearances * 90) / player.assists),
  }))
}

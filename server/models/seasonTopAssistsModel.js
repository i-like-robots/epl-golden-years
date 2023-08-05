const { squads } = require('../dataset')

function sortByAssists(a, b) {
  if (a.assists > b.assists) return -1
  if (a.assists < b.assists) return 1
  if (a.appearances > b.appearances) return 1
  if (a.appearances < b.appearances) return -1

  return 0
}

module.exports = function seasonTopAssistsModel(seasonId) {
  const unique = {}

  squads.forEach((squad) => {
    if (squad.seasonId !== seasonId) {
      return
    }

    squad.players.forEach((player) => {
      if (player.assists === 0) {
        return
      }

      unique[player.playerId] ??= {
        playerId: player.playerId,
        assists: 0,
        appearances: 0,
      }

      unique[player.playerId].assists += player.assists
      unique[player.playerId].appearances += player.appearances
    })
  })

  const draft = Array.from(Object.values(unique))

  draft.sort(sortByAssists)

  return draft.slice(0, 10).map((player) => ({
    ...player,
    minutesPerAssist: Math.round((player.appearances * 90) / player.assists),
  }))
}

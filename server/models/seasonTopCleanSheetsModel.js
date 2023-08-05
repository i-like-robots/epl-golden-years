const { players, squads } = require('../dataset')

function sortByCleanSheets(a, b) {
  if (a.cleanSheets > b.cleanSheets) return -1
  if (a.cleanSheets < b.cleanSheets) return 1
  if (a.appearances > b.appearances) return -1
  if (a.appearances < b.appearances) return 1

  return 0
}

module.exports = function seasonTopCleanSheetsModel(seasonId) {
  const unique = {}

  squads.forEach((squad) => {
    if (squad.seasonId !== seasonId) {
      return
    }

    squad.players.forEach((player) => {
      if (players[player.playerId].positionCode !== 'G' || player.cleanSheets === 0) {
        return
      }

      unique[player.playerId] ??= {
        playerId: player.playerId,
        cleanSheets: 0,
        appearances: 0,
      }

      unique[player.playerId].cleanSheets += player.cleanSheets
      unique[player.playerId].appearances += player.appearances
    })
  })

  const draft = Array.from(Object.values(unique))

  draft.sort(sortByCleanSheets)

  return draft.slice(0, 10).map((player) => ({ ...player }))
}

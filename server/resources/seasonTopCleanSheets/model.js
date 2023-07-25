const { players, squads } = require('../../dataset')

function sortByCleanSheets(a, b) {
  if (a.cleanSheets > b.cleanSheets) return -1
  if (a.cleanSheets < b.cleanSheets) return 1
  if (a.appearances > b.appearances) return -1
  if (a.appearances < b.appearances) return 1

  return 0
}

module.exports = function seasonTopCleanSheetsModel(seasonId) {
  const draft = []

  squads.forEach((squad) => {
    if (squad.seasonId === seasonId) {
      squad.players.forEach((player) => {
        if (players[player.playerId].positionCode === 'G' && player.cleanSheets) {
          draft.push(player)
        }
      })
    }
  })

  // TODO: merge players if needed, i.e. they transferred
  draft.sort(sortByCleanSheets)

  return draft.slice(0, 10).map((player) => ({ ...player }))
}

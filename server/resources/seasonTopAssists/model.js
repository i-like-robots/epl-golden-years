const { squads } = require('../../dataset')

function sortByAssists(a, b) {
  if (a.assists > b.assists) return -1
  if (a.assists < b.assists) return 1
  if (a.appearances > b.appearances) return 1
  if (a.appearances < b.appearances) return -1

  return 0
}

module.exports = function seasonTopAssistsModel(seasonId) {
  const draft = []

  squads.forEach((squad) => {
    if (squad.seasonId === seasonId) {
      squad.players.forEach((player) => {
        if (player.assists) {
          draft.push(player)
        }
      })
    }
  })

  // TODO: merge players if needed, i.e. they transferred
  draft.sort(sortByAssists)

  return draft.slice(0, 10).map((player) => ({
    ...player,
    minutesPerAssist: Math.round((player.appearances * 90) / player.assists),
  }))
}

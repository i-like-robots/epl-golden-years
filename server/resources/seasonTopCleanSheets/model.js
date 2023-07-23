const { players, squads, seasons } = require('../../dataset')
const pick = require('../../lib/object-pick')
const get = require('../../lib/object-get')

module.exports = function seasonTopCleanSheetsModel(seasonId) {
  const season = get(seasons, seasonId)

  if (season) {
    const data = []

    squads.forEach((squad) => {
      if (squad.seasonId === seasonId) {
        squad.players.forEach((player) => {
          if (players[player.playerId].positionCode === 'G' && player.cleanSheets) {
            data.push(player)
          }
        })
      }
    })

    data.sort((a, b) => {
      if (a.cleanSheets > b.cleanSheets) return -1
      if (a.cleanSheets < b.cleanSheets) return 1
      if (a.appearances > b.appearances) return -1
      if (a.appearances < b.appearances) return 1

      return 0
    })

    return data.slice(0, 10).map((player) => pick(player, 'playerId', 'cleanSheets', 'appearances'))
  }
}

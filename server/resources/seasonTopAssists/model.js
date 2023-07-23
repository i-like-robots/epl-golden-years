const { squads, seasons } = require('../../dataset')
const pick = require('../../lib/object-pick')
const get = require('../../lib/object-get')

module.exports = function seasonTopAssistsModel(seasonId) {
  const season = get(seasons, seasonId)

  if (season) {
    const data = []

    squads.forEach((squad) => {
      if (squad.seasonId === seasonId) {
        squad.players.forEach((player) => {
          if (player.assists) {
            data.push(player)
          }
        })
      }
    })

    data.sort((a, b) => {
      if (a.assists > b.assists) return -1
      if (a.assists < b.assists) return 1
      if (a.appearances > b.appearances) return 1
      if (a.appearances < b.appearances) return -1

      return 0
    })

    return data.slice(0, 10).map((player) => ({
      ...pick(player, 'playerId', 'assists', 'appearances'),
      minutesPerAssist: Math.round((player.appearances * 90) / player.assists),
    }))
  }
}

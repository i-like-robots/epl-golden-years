const { players, squads, seasons } = require('../dataset')
const { playerUrl, seasonUrl } = require('../lib/urls')
const pick = require('../lib/object-pick')
const get = require('../lib/object-get')

module.exports = function seasonTopCleanSheetsRoute(request, response) {
  const { seasonId } = request.params
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

    const table = data.slice(0, 10).map((player) => ({
      player: playerUrl(player.playerId),
      ...pick(player, 'cleanSheets', 'appearances'),
    }))

    response.send({ season: seasonUrl(seasonId), table })
  } else {
    response.code(404)
    response.send({ error: 'Season not found' })
  }
}

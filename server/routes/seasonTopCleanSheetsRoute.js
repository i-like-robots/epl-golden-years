const { players, squads } = require('../dataset')
const { playerUrl, seasonUrl } = require('../lib/urls')
const pick = require('../lib/object-pick')

module.exports = function seasonTopCleanSheetsRoute(request, response) {
  const { seasonId } = request.params
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

  if (data.length) {
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

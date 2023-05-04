const { players, squads } = require('../dataset')
const { playerUrl, seasonUrl } = require('../lib/urls')
const pick = require('../lib/object-pick')

module.exports = function seasonTopCleanSheetsRoute(request, response) {
  const { seasonId } = request.params
  const list = []

  squads.forEach((squad) => {
    if (squad.seasonId === seasonId) {
      squad.players.forEach((member) => {
        if (players[member.playerId].positionCode === 'G' && member.cleanSheets) {
          list.push(member)
        }
      })
    }
  })

  if (list.length) {
    list.sort((a, b) => {
      if (a.cleanSheets > b.cleanSheets) return -1
      if (a.cleanSheets < b.cleanSheets) return 1
      if (a.appearances > b.appearances) return -1
      if (a.appearances < b.appearances) return 1

      return 0
    })

    const data = list.slice(0, 10).map((player) => ({
      player: playerUrl(player.playerId),
      ...pick(player, 'cleanSheets', 'appearances'),
    }))

    response.send({ season: seasonUrl(seasonId), goalkeepers: data })
  } else {
    response.code(404)
    response.send({ error: 'Season not found' })
  }
}

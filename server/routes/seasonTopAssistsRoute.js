const { squads } = require('../dataset')
const { playerUrl, seasonUrl } = require('../lib/urls')
const pick = require('../lib/object-pick')

module.exports = function seasonTopAssistsRoute(request, response) {
  const { seasonId } = request.params
  const players = []

  squads.forEach((squad) => {
    if (squad.seasonId === seasonId) {
      squad.players.forEach((player) => {
        if (player.assists) {
          players.push(player)
        }
      })
    }
  })

  if (players.length) {
    players.sort((a, b) => {
      if (a.assists > b.assists) return -1
      if (a.assists < b.assists) return 1
      if (a.appearances > b.appearances) return 1
      if (a.appearances < b.appearances) return -1

      return 0
    })

    const data = players.slice(0, 10).map((player) => ({
      player: playerUrl(player.playerId),
      ...pick(player, 'assists', 'appearances'),
      minutesPerAssists: Math.round((player.appearances * 90) / player.assists),
    }))

    response.send({ season: seasonUrl(seasonId), assists: data })
  } else {
    response.code(404)
    response.send({ error: 'Season not found' })
  }
}

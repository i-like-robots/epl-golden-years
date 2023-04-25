const { squads } = require('../dataset')
const { SEASON_ID } = require('../lib/constants')
const { playerUrl, seasonUrl } = require('../lib/urls')
const pick = require('../lib/object-pick')

const seasonTopAssistsRouteOptions = {
  schema: {
    params: {
      seasonId: {
        type: 'string',
        pattern: SEASON_ID,
      },
    },
  },
}

function seasonTopAssistsRouteHandler(request, response) {
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
      if (a.goals > b.goals) return -1
      if (a.goals < b.goals) return 1

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

module.exports = [seasonTopAssistsRouteOptions, seasonTopAssistsRouteHandler]

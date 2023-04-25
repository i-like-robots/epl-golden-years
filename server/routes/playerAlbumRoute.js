const { players, stickers } = require('../dataset')
const { PLAYER_ID } = require('../lib/constants')
const { seasonUrl, teamUrl, playerUrl } = require('../lib/urls')

const routeOptions = {
  schema: {
    params: {
      playerId: {
        type: 'string',
        pattern: PLAYER_ID,
      },
    },
  }
}

function routeHandler(request, response) {
  const { playerId } = request.params
  const player = players[playerId]

  if (player) {
    const data = (stickers[playerId] || []).map((sticker) => ({
      season: seasonUrl(sticker.seasonId),
      team: teamUrl(sticker.teamId),
      url: sticker.sticker,
    }))

    response.send({ player: playerUrl(playerId), stickers: data })
  } else {
    response.code(404)
    response.send({ error: 'Player not found' })
  }
}

module.exports = { routeOptions, routeHandler }

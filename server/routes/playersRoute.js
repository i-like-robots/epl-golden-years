const { players } = require('../dataset')
const { PLAYER_POSITIONS } = require('../lib/constants')
const { playerUrl } = require('../lib/urls')
const search = require('../lib/object-search')

const NAME_PROPS = ['displayName', 'firstName', 'lastName']

const playerRouteOptions = {
  schema: {
    query: {
      name: {
        type: 'string',
        pattern: '^\\w+$',
      },
      position: {
        type: 'string',
        enum: PLAYER_POSITIONS,
      },
    },
  },
}

function playerRouteHandler(request, response) {
  const { name, position } = request.query

  const filters = []
  const playersData = []

  if (name) {
    const fn = search(name)
    filters.push((player) => fn(player, NAME_PROPS))
  }

  if (position) {
    filters.push((player) => player.positionCode === position)
  }

  Object.keys(players).forEach((playerId) => {
    const player = players[playerId]

    if (filters.every((filter) => filter(player))) {
      playersData.push(playerUrl(playerId))
    }
  })

  response.send(playersData)
}

module.exports = [playerRouteOptions, playerRouteHandler]

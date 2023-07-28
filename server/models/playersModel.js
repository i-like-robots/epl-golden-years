const { players } = require('../dataset')
const search = require('../lib/object-search')

const NAME_PROPS = ['displayName', 'firstName', 'lastName']

module.exports = function playersModel(filters = {}) {
  const filterFns = []
  const playerIds = []

  if (filters.name) {
    const fn = search(filters.name)
    filterFns.push((player) => fn(player, NAME_PROPS))
  }

  if (filters.position) {
    filterFns.push((player) => player.positionCode === filters.position)
  }

  Object.keys(players).forEach((playerId) => {
    const player = players[playerId]

    if (filterFns.every((filter) => filter(player))) {
      playerIds.push(playerId)
    }
  })

  return playerIds
}

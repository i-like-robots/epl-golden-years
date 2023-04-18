const { players } = require('../dataset')
const { playerUrl } = require('../lib/urls')
const search = require('../lib/object-search')

const SEARCH_PROPS = ['displayName', 'firstName', 'lastName']

module.exports = function playersRoute(request, response) {
  const matcher = search(request.query.search)
  const playersData = []

  Object.keys(players).forEach((playerId) => {
    const player = players[playerId]

    if (typeof matcher === 'function' ? matcher(player, SEARCH_PROPS) : true) {
      playersData.push(playerUrl(playerId))
    }
  })

  response.send(playersData)
}

const { players } = require('../dataset')
const { playerUrl } = require('../lib/urls')
const matches = require('../lib/object-matches')

const SEARCH_PATTERN = /^[a-z]+$/i

const SEARCH_FIELDS = ['displayName', 'firstName', 'lastName']

const isSearchValid = (search) => search && SEARCH_PATTERN.test(search)

module.exports = function playersRoute(request, response) {
  const { search } = request.query
  const matcher = isSearchValid(search) ? matches(search) : null
  const playersData = []

  Object.keys(players).forEach((playerId) => {
    const player = players[playerId]

    if (matcher ? matcher(player, SEARCH_FIELDS) : true) {
      playersData.push(playerUrl(playerId))
    }
  })

  response.send(playersData)
}

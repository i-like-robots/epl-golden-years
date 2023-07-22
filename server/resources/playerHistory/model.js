const { players, squads } = require('../../dataset')
const pick = require('../../lib/object-pick')
const get = require('../../lib/object-get')

module.exports = function playerHistory(playerId) {
  const player = get(players, playerId)

  if (player) {
    const history = []

    squads.forEach((squad) => {
      const inSquad = squad.players.some((player) => player.playerId === playerId)

      if (inSquad) {
        history.push(pick(squad, 'seasonId', 'teamId'))
      }
    })

    return history
  }
}

const { squads } = require('../../dataset')

module.exports = function playerHistory(playerId) {
  const history = []

  squads.forEach((squad) => {
    const inSquad = squad.players.some((player) => player.playerId === playerId)

    if (inSquad) {
      history.push({
        seasonId: squad.seasonId,
        teamId: squad.teamId,
      })
    }
  })

  return history
}

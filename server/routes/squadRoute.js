const pick = require('../lib/object-pick')
const restfulUri = require('../lib/baseUrl')
const squads = require('../../data/squads.json')

module.exports = function squadRoute(request, response) {
  const squad = squads.find((squad) => {
    return squad.teamId === request.params.teamId && squad.seasonId === request.params.seasonId
  })

  if (squad) {
    const players = squad.players.map((player) => (
      {
        player: restfulUri(request, 'players', player.playerId),
        ...pick(player, 'appearances', 'cleanSheets', 'goals'),
      }
    ))

    const squadData = {
      season: restfulUri(request, 'seasons', squad.seasonId),
      team: restfulUri(request, 'teams', squad.teamId),
      players
    }

    response.json(squadData)
  } else {
    response.sendStatus(404)
  }
}

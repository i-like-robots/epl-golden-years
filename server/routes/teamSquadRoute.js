const pick = require('../lib/object-pick')
const { seasonUrl, teamUrl, playerUrl } = require('../lib/urls')
const squads = require('../../data/squads.json')

module.exports = function teamSquadRoute(request, response) {
  const { teamId, seasonId } = request.params

  const squad = squads.find((squad) => {
    return squad.teamId === teamId && squad.seasonId === seasonId
  })

  if (squad) {
    const players = squad.players.map((player) => (
      {
        player: playerUrl(player.playerId),
        ...pick(player, 'appearances', 'cleanSheets', 'goals'),
      }
    ))

    const squadData = {
      season: seasonUrl(squad.seasonId),
      team: teamUrl(squad.teamId),
      players
    }

    response.json(squadData)
  } else {
    response.sendStatus(404)
  }
}

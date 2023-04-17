const { squads } = require('../dataset')
const { seasonUrl, teamUrl, playerUrl } = require('../lib/urls')
const pick = require('../lib/object-pick')

module.exports = function teamSquadRoute(request, response) {
  const { teamId, seasonId } = request.params

  const squad = squads.find((squad) => {
    return squad.teamId === teamId && squad.seasonId === seasonId
  })

  if (squad) {
    const players = squad.players.map((player) => ({
      player: playerUrl(player.playerId),
      ...pick(player, 'appearances', 'cleanSheets', 'goals'),
    }))

    response.send({
      season: seasonUrl(squad.seasonId),
      team: teamUrl(squad.teamId),
      players,
    })
  } else {
    response.code(404)
    response.send({ error: 'Squad not found' })
  }
}

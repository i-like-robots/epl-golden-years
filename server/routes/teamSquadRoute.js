const teamSquadModel = require('../resources/teamSquad/model')
const { seasonUrl, teamUrl, playerUrl, managerUrl, teamSquadUrl } = require('../lib/urls')

module.exports = function teamSquadRoute(request, response) {
  const { teamId, seasonId } = request.params

  const squad = teamSquadModel(teamId, seasonId)

  if (squad) {
    const players = squad.players.map((player) => ({
      ...player,
      playerId: undefined,
      player: playerUrl(player.playerId),
    }))

    const managers = squad.managers.map((managerId) => managerUrl(managerId))

    response.send({
      team: teamUrl(teamId),
      season: seasonUrl(seasonId),
      players,
      managers,
      links: {
        previous: squad.previousId && teamSquadUrl(teamId, squad.previousId),
        next: squad.nextId && teamSquadUrl(teamId, squad.nextId),
      },
    })
  } else {
    response.code(404)
    response.send({ error: 'Squad not found' })
  }
}

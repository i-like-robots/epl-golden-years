const teamSquadModel = require('../../resources/teamSquad/model')
const teamSquadManagersModel = require('../../resources/teamSquadManagers/model')
const teamSquadLinksModel = require('../../resources/teamSquadLinks/model')
const { seasonUrl, teamUrl, playerUrl, managerUrl, teamSquadUrl } = require('../../lib/urls')

module.exports = function teamSquadRoute(request, response) {
  const { teamId, seasonId } = request.params
  const squad = teamSquadModel(teamId, seasonId)

  if (squad) {
    const players = squad.players.map((player) => ({
      ...player,
      player: playerUrl(player.playerId),
    }))

    const managers = teamSquadManagersModel(teamId, seasonId).map(managerUrl)

    const links = teamSquadLinksModel(teamId, seasonId)

    response.send({
      team: teamUrl(teamId),
      season: seasonUrl(seasonId),
      players,
      managers,
      links: {
        previous: links.previousId ? teamSquadUrl(teamId, links.previousId) : null,
        next: links.nextId ? teamSquadUrl(teamId, links.nextId) : null,
      },
    })
  } else {
    response.code(404)
    response.send({ error: 'Squad not found' })
  }
}

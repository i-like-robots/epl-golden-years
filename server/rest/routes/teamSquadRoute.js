const teamSquadModel = require('../../models/teamSquadModel')
const teamSquadManagersModel = require('../../models/teamSquadManagersModel')
const teamSquadLinksModel = require('../../models/teamSquadLinksModel')
const { seasonUrl, teamUrl, playerUrl, managerUrl, teamSquadUrl } = require('../urls')

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

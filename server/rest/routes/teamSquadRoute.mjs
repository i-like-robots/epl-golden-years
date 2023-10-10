import teamSquadModel from '../../models/teamSquadModel.mjs'
import teamSquadManagersModel from '../../models/teamSquadManagersModel.mjs'
import teamSquadLinksModel from '../../models/teamSquadLinksModel.mjs'
import { seasonUrl, teamUrl, playerUrl, managerUrl, teamSquadUrl } from '../urls.mjs'

export default function teamSquadRoute(request, response) {
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

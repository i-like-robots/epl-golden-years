import teamSquadsModel from '../../models/teamSquadsModel.js'
import { teamSquadUrl, teamUrl } from '../urls.js'

export default function teamSquadsRoute(request, response) {
  const { teamId } = request.params
  const squads = teamSquadsModel(teamId)

  if (squads.length) {
    const data = squads.map(({ seasonId }) => teamSquadUrl(teamId, seasonId))
    response.send({ team: teamUrl(teamId), squads: data })
  } else {
    response.code(404)
    response.send({ error: 'Team not found' })
  }
}

import teamModel from '../../models/teamModel.js'
import teamSeasonsModel from '../../models/teamSeasonsModel.js'
import { seasonUrl, teamStatsUrl, teamSquadsUrl } from '../urls.js'

export default function teamRoute(request, response) {
  const { teamId } = request.params
  const team = teamModel(teamId)

  if (team) {
    const seasons = teamSeasonsModel(teamId).map((seasonId) => seasonUrl(seasonId))

    const squads = teamSquadsUrl(teamId)

    const stats = teamStatsUrl(teamId)

    response.send({ ...team, seasons, squads, stats })
  } else {
    response.code(404)
    response.send({ error: 'Team not found' })
  }
}

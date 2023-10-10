import teamModel from '../../models/teamModel.mjs'
import teamSeasonsModel from '../../models/teamSeasonsModel.mjs'
import { seasonUrl, teamStatsUrl, teamSquadsUrl } from '../urls.mjs'

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

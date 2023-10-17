import teamsModel from '../../models/teamsModel.js'
import { teamUrl } from '../urls.js'

export default function teamsRoute(request, response) {
  const { name } = request.query
  const teamIds = teamsModel({ name })

  response.send(teamIds.map((teamId) => teamUrl(teamId)))
}

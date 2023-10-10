import teamsModel from '../../models/teamsModel.mjs'
import { teamUrl } from '../urls.mjs'

export default function teamsRoute(request, response) {
  const { name } = request.query
  const teamIds = teamsModel({ name })

  response.send(teamIds.map((teamId) => teamUrl(teamId)))
}

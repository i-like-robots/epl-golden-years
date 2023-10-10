import managerModel from '../../models/managerModel.mjs'
import { seasonUrl, teamUrl } from '../urls.mjs'

export default function managerRoute(request, response) {
  const { managerId } = request.params
  const manager = managerModel(managerId)

  if (manager) {
    const history = manager.history.map((record) => ({
      season: seasonUrl(record.seasonId),
      team: teamUrl(record.teamId),
    }))

    response.send({ ...manager, history })
  } else {
    response.code(404)
    response.send({ error: 'Manager not found' })
  }
}

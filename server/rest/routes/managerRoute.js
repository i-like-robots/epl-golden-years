import managerModel from '../../models/managerModel.js'
import { seasonUrl, teamUrl } from '../urls.js'

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

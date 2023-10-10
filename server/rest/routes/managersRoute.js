import managersModel from '../../models/managersModel.js'
import { managerUrl } from '../urls.js'

export default function managersRoute(request, response) {
  const { name } = request.query
  const managerIds = managersModel({ name })

  response.send(managerIds.map((managerId) => managerUrl(managerId)))
}

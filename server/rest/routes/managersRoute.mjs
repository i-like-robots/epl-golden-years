import managersModel from '../../models/managersModel.mjs'
import { managerUrl } from '../urls.mjs'

export default function managersRoute(request, response) {
  const { name } = request.query
  const managerIds = managersModel({ name })

  response.send(managerIds.map((managerId) => managerUrl(managerId)))
}

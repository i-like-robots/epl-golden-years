import seasonsModel from '../../models/seasonsModel.js'
import { seasonUrl } from '../urls.js'

export default function seasonsRoute(request, response) {
  const { team } = request.query
  const seasonsIds = seasonsModel({ team })

  response.send(seasonsIds.map((seasonId) => seasonUrl(seasonId)))
}

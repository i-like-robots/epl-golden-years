import seasonsModel from '../../models/seasonsModel.mjs'
import { seasonUrl } from '../urls.mjs'

export default function seasonsRoute(request, response) {
  const { team } = request.query
  const seasonsIds = seasonsModel({ team })

  response.send(seasonsIds.map((seasonId) => seasonUrl(seasonId)))
}

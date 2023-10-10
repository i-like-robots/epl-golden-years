import seasonTableModel from '../../models/seasonTableModel.mjs'
import { seasonUrl, teamUrl } from '../urls.mjs'

export default function seasonTableRoute(request, response) {
  const { seasonId } = request.params
  const table = seasonTableModel(seasonId)

  if (table) {
    const data = table.map((row) => ({
      ...row,
      team: teamUrl(row.teamId),
    }))

    response.send({ season: seasonUrl(seasonId), table: data })
  } else {
    response.code(404)
    response.send({ error: 'Season not found' })
  }
}

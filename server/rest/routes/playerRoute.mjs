import playerModel from '../../models/playerModel.mjs'
import playerHistoryModel from '../../models/playerHistoryModel.mjs'
import { playerAlbumUrl, playerStatsUrl, seasonUrl, teamUrl } from '../urls.mjs'

export default function playerRoute(request, response) {
  const { playerId } = request.params
  const player = playerModel(playerId)

  if (player) {
    const history = playerHistoryModel(playerId).map((record) => ({
      season: seasonUrl(record.seasonId),
      team: teamUrl(record.teamId),
    }))

    const stats = playerStatsUrl(playerId)

    const album = playerAlbumUrl(playerId)

    response.send({ ...player, history, stats, album })
  } else {
    response.code(404)
    response.send({ error: 'Player not found' })
  }
}

import seasonTopScorersModel from '../../models/seasonTopScorersModel.js'
import { playerUrl, seasonUrl } from '../urls.js'

export default function seasonTopScorersRoute(request, response) {
  const { seasonId } = request.params
  const data = seasonTopScorersModel(seasonId)

  if (data.length) {
    const table = data.map((player) => ({
      ...player,
      player: playerUrl(player.playerId),
    }))

    response.send({ season: seasonUrl(seasonId), table })
  } else {
    response.code(404)
    response.send({ error: 'Season not found' })
  }
}

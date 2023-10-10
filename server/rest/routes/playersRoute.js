import playersModel from '../../models/playersModel.js'
import { playerUrl } from '../urls.js'

export default function playerRoute(request, response) {
  const { name, position } = request.query
  const playerIds = playersModel({ name, position })

  response.send(playerIds.map((playerId) => playerUrl(playerId)))
}

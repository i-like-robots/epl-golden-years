import playersModel from '../../models/playersModel.mjs'
import { playerUrl } from '../urls.mjs'

export default function playerRoute(request, response) {
  const { name, position } = request.query
  const playerIds = playersModel({ name, position })

  response.send(playerIds.map((playerId) => playerUrl(playerId)))
}

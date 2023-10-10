import { players } from '../dataset.js'
import get from '../lib/object-get.js'

export default function playerModel(playerId) {
  return get(players, playerId)
}

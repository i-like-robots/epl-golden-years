import { players } from '../dataset.mjs'
import get from '../lib/object-get.mjs'

export default function playerModel(playerId) {
  return get(players, playerId)
}

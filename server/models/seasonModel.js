import { seasons } from '../dataset.js'
import get from '../lib/object-get.js'

export default function seasonModel(seasonId) {
  return get(seasons, seasonId)
}

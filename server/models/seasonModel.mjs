import { seasons } from '../dataset.mjs'
import get from '../lib/object-get.mjs'

export default function seasonModel(seasonId) {
  return get(seasons, seasonId)
}

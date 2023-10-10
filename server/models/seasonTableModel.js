import { tables } from '../dataset.js'
import get from '../lib/object-get.js'

export default function seasonTableModel(seasonId) {
  return get(tables, seasonId)
}

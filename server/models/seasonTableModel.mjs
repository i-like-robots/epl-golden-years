import { tables } from '../dataset.mjs'
import get from '../lib/object-get.mjs'

export default function seasonTableModel(seasonId) {
  return get(tables, seasonId)
}

import { seasons } from '../dataset.mjs'
import get from '../lib/object-get.mjs'

export default function seasonLinksModel(seasonId) {
  const season = get(seasons, seasonId)

  if (season) {
    const seasonIds = Object.keys(seasons)
    const seasonIndex = seasonIds.indexOf(seasonId)
    const previousId = seasonIds[seasonIndex - 1] || null
    const nextId = seasonIds[seasonIndex + 1] || null

    return { previousId, nextId }
  }
}

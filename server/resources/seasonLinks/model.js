const { seasons } = require('../../dataset')

module.exports = function seasonModel(seasonId) {
  const seasonIds = Object.keys(seasons)
  const seasonIndex = seasonIds.indexOf(seasonId)
  const previousId = seasonIndex ? seasonIds[seasonIndex - 1] : null
  const nextId = seasonIndex ? seasonIds[seasonIndex + 1] : null

  return { previousId, nextId }
}

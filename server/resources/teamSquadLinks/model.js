const { squads } = require('../../dataset')

module.exports = function teamSquadLinksModel(teamId, seasonId) {
  const seasonIds = squads.reduce((acc, squad) => {
    if (squad.teamId === teamId) {
      acc.push(squad.seasonId)
    }

    return acc
  }, [])

  const seasonIndex = seasonIds.indexOf(seasonId)
  const nextId = seasonIndex > -1 ? seasonIds[seasonIndex + 1] : null
  const previousId = seasonIndex > -1 ? seasonIds[seasonIndex - 1] : null

  return { previousId, nextId }
}

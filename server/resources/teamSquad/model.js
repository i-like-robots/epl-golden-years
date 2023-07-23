const { squads, managers } = require('../../dataset')
const get = require('../../lib/object-get')

module.exports = function teamSquadModel(teamId, seasonId) {
  const teamSquads = squads.reduce((acc, squad) => {
    if (squad.teamId === teamId) {
      acc[squad.seasonId] = squad
    }

    return acc
  }, {})

  const squad = get(teamSquads, seasonId)

  if (squad) {
    const managerIds = Object.keys(managers).filter((managerId) => {
      const manager = managers[managerId]
      return manager.history.some((h) => h.teamId === teamId && h.seasonId === seasonId)
    })

    const seasonIds = Object.keys(teamSquads)
    const seasonIndex = seasonIds.indexOf(seasonId)
    const nextId = seasonIds[seasonIndex + 1]
    const previousId = seasonIds[seasonIndex - 1]

    return {
      players: squad.players,
      managers: managerIds,
      previousId,
      nextId,
    }
  }
}

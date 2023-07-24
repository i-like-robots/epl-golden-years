const { managers } = require('../../dataset')

module.exports = function teamSquadManagersModel(teamId, seasonId) {
  return Object.keys(managers).filter((managerId) => {
    const manager = managers[managerId]
    return manager.history.some((h) => h.teamId === teamId && h.seasonId === seasonId)
  })
}

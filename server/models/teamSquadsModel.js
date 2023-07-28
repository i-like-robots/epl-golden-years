const { squads } = require('../dataset')

module.exports = function teamSquadsModel(teamId) {
  const data = []

  squads.forEach((squad) => {
    if (squad.teamId === teamId) {
      data.push({ teamId, seasonId: squad.seasonId })
    }
  })

  return data
}

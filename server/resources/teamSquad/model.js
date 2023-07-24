const { squads } = require('../../dataset')

module.exports = function teamSquadModel(teamId, seasonId) {
  return squads.find((squad) => {
    return squad.teamId === teamId && squad.seasonId === seasonId
  })
}

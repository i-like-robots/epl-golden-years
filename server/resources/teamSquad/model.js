const { squads } = require('../../dataset')

module.exports = function teamSquadModel(teamId, seasonId) {
  return squads.find((squad) => squad.teamId === teamId && squad.seasonId === seasonId)
}

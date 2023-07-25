const { tables } = require('../../dataset')

module.exports = function teamSeasonsModel(teamId) {
  const seasons = []

  Object.keys(tables).forEach((seasonId) => {
    const inSeason = tables[seasonId].some((team) => team.teamId === teamId)

    if (inSeason) {
      seasons.push(seasonId)
    }
  })

  return seasons
}

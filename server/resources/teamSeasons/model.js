const { tables, teams } = require('../../dataset')
const get = require('../../lib/object-get')

module.exports = function teamSeasonsModel(teamId) {
  const team = get(teams, teamId)

  if (team) {
    const seasons = []

    Object.keys(tables).forEach((seasonId) => {
      const inSeason = tables[seasonId].some((team) => team.teamId === teamId)

      if (inSeason) {
        seasons.push(seasonId)
      }
    })

    return seasons
  }
}

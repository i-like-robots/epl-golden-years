const { tables, teams } = require('../dataset')
const { TEAM_ID } = require('../lib/constants')
const { seasonUrl, teamSquadUrl, teamStatsUrl } = require('../lib/urls')
const omit = require('../lib/object-omit')

const teamRouteOptions = {
  schema: {
    params: {
      teamId: {
        type: 'string',
        pattern: TEAM_ID,
      },
    },
  },
}

function teamRouteHandler(request, response) {
  const { teamId } = request.params
  const team = teams[teamId]

  if (team) {
    const history = []

    Object.keys(tables).forEach((seasonId) => {
      const playedInSeason = tables[seasonId].some((team) => team.teamId === teamId)

      playedInSeason &&
        history.push({
          season: seasonUrl(seasonId),
          squad: teamSquadUrl(teamId, seasonId),
        })
    })

    const statistics = teamStatsUrl(teamId)

    response.send({ ...omit(team, 'teamId'), history, statistics })
  } else {
    response.code(404)
    response.send({ error: 'Team not found' })
  }
}

module.exports = [teamRouteOptions, teamRouteHandler]

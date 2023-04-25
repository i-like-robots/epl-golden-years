const { squads } = require('../dataset')
const { TEAM_ID } = require('../lib/constants')
const { teamSquadUrl, teamUrl } = require('../lib/urls')

const teamSquadsRouteOptions = {
  schema: {
    params: {
      teamId: {
        type: 'string',
        pattern: TEAM_ID,
      },
    },
  },
}

function teamSquadsRouteHandler(request, response) {
  const { teamId } = request.params

  const data = []

  squads.forEach((squad) => {
    if (squad.teamId === teamId) {
      data.push(teamSquadUrl(teamId, squad.seasonId))
    }
  })

  if (squads.length) {
    response.send({ team: teamUrl(teamId), squads: data })
  } else {
    response.code(404)
    response.send({ error: 'Team not found' })
  }
}

module.exports = [teamSquadsRouteOptions, teamSquadsRouteHandler]

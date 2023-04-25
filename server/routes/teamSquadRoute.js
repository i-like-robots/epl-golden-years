const { squads } = require('../dataset')
const { TEAM_ID, SEASON_ID } = require('../lib/constants')
const { seasonUrl, teamUrl, playerUrl } = require('../lib/urls')
const pick = require('../lib/object-pick')

const teamSquadRouteOptions = {
  schema: {
    params: {
      teamId: {
        type: 'string',
        pattern: TEAM_ID,
      },
      seasonId: {
        type: 'string',
        pattern: SEASON_ID,
      },
    },
  },
}

function teamSquadRouteHandler(request, response) {
  const { teamId, seasonId } = request.params

  const squad = squads.find((squad) => {
    return squad.teamId === teamId && squad.seasonId === seasonId
  })

  if (squad) {
    const players = squad.players.map((player) => ({
      player: playerUrl(player.playerId),
      ...pick(player, 'appearances', 'cleanSheets', 'goals', 'assists'),
    }))

    response.send({
      season: seasonUrl(squad.seasonId),
      team: teamUrl(squad.teamId),
      players,
    })
  } else {
    response.code(404)
    response.send({ error: 'Squad not found' })
  }
}

module.exports = [teamSquadRouteOptions, teamSquadRouteHandler]

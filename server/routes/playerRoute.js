const { PLAYER_ID } = require('../lib/constants')
const { players, squads } = require('../dataset')
const { playerAlbumUrl, playerStatsUrl, seasonUrl, teamSquadUrl } = require('../lib/urls')
const omit = require('../lib/object-omit')

const routeOptions = {
  schema: {
    params: {
      playerId: {
        type: 'string',
        pattern: PLAYER_ID,
      },
    },
  },
}

function routeHandler(request, response) {
  const { playerId } = request.params
  const player = players[playerId]

  if (player) {
    const history = []

    squads.forEach((squad) => {
      const playedInSeason = squad.players.some((player) => player.playerId === playerId)

      playedInSeason &&
        history.push({
          season: seasonUrl(squad.seasonId),
          squad: teamSquadUrl(squad.teamId, squad.seasonId),
        })
    })

    const statistics = playerStatsUrl(playerId)

    const album = playerAlbumUrl(playerId)

    response.send({ ...omit(player, 'playerId'), history, statistics, album })
  } else {
    response.code(404)
    response.send({ error: 'Player not found' })
  }
}

module.exports = { routeOptions, routeHandler }

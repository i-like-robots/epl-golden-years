const { players, squads } = require('../dataset')
const { playerAlbumUrl, playerStatsUrl, seasonUrl, teamSquadUrl } = require('../lib/urls')
const omit = require('../lib/object-omit')

module.exports = function playerRoute(request, response) {
  const { playerId } = request.params
  const player = players[playerId]

  if (player) {
    const history = []

    squads.forEach((squad) => {
      if (squad.players.some((player) => player.playerId === playerId)) {
        history.push({
          season: seasonUrl(squad.seasonId),
          squad: teamSquadUrl(squad.teamId, squad.seasonId),
        })
      }
    })

    const statistics = playerStatsUrl(playerId)

    const album = playerAlbumUrl(playerId)

    response.send({ ...omit(player, 'playerId'), history, statistics, album })
  } else {
    response.code(404)
    response.send({ error: 'Player not found' })
  }
}

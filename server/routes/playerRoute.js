const { players, squads } = require('../dataset')
const { playerAlbumUrl, playerStatsUrl, seasonUrl, teamUrl } = require('../lib/urls')
const omit = require('../lib/object-omit')
const get = require('../lib/object-get')

module.exports = function playerRoute(request, response) {
  const { playerId } = request.params
  const player = get(players, playerId)

  if (player) {
    const history = []

    squads.forEach((squad) => {
      const playedInSeason = squad.players.some((player) => player.playerId === playerId)

      if (playedInSeason) {
        history.push({
          season: seasonUrl(squad.seasonId),
          team: teamUrl(squad.teamId),
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

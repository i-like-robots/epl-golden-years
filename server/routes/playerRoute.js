const { players, squads } = require('../dataset')
const { playerAlbumUrl, playerStatsUrl, seasonUrl, teamSquadUrl } = require('../lib/urls')

module.exports = function playerRoute(request, response) {
  const { playerId } = request.params
  const player = players[playerId]

  if (player) {
    const squadHistory = squads.filter((squad) =>
      squad.players.some((p) => p.playerId === playerId)
    )

    const history = squadHistory.map((squad) => (
      {
        season: seasonUrl(squad.seasonId),
        squad: teamSquadUrl(squad.teamId, squad.seasonId),
      }
    ))

    const statistics = playerStatsUrl(playerId)

    const album = playerAlbumUrl(playerId)

    response.json({ ...player, history, statistics, album })
  } else {
    response.sendStatus(404)
  }
}

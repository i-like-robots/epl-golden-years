const { players, stickers, squads } = require('../dataset')
const { seasonUrl, teamSquadUrl, teamUrl } = require('../lib/urls')

module.exports = function playerRoute(request, response) {
  const { playerId } = request.params
  const player = players[playerId]

  if (player) {
    const squadHistory = squads.filter((squad) =>
      squad.players.some((p) => p.playerId === playerId)
    )

    const history = []
    const stats = { appearances: 0, cleanSheets: 0, goals: 0, assists: 0 }

    squadHistory.forEach((squad) => {
      const member = squad.players.find((p) => p.playerId === playerId)

      history.push({
        season: seasonUrl(squad.seasonId),
        squad: teamSquadUrl(squad.teamId, squad.seasonId),
      })

      stats.appearances += member.appearances
      stats.cleanSheets += member.cleanSheets
      stats.goals += member.goals
      stats.assists += member.assists
    })

    const album = (stickers[playerId] || []).map((item) => (
      {
        season: seasonUrl(item.seasonId),
        team: teamUrl(item.teamId),
        url: item.sticker,
      }
    ))

    response.json({ playerId, ...player, history, stats, album })
  } else {
    response.sendStatus(404)
  }
}

const restfulUri = require('../lib/baseUrl')
const squads = require('../../data/squads.json')
const players = require('../../data/players.json')
const stickers = require('../../data/laststicker.json')

module.exports = function playerRoute(request, response) {
  const playerId = request.params.playerId
  const player = players[playerId]

  if (player) {
    const squadHistory = squads.filter((squad) =>
      squad.players.some((p) => p.playerId === playerId)
    )

    const history = []
    const stats = { appearances: 0, cleanSheets: 0, goals: 0 }

    squadHistory.forEach((squad) => {
      const member = squad.players.find((p) => p.playerId === playerId)

      history.push({
        season: restfulUri(request, 'seasons', squad.seasonId),
        squad: restfulUri(request, 'squads', squad.seasonId, squad.teamId),
        team: restfulUri(request, 'teams', squad.teamId),
      })

      stats.appearances += member.appearances
      stats.cleanSheets += member.cleanSheets
      stats.goals += member.goals
    })

    const album = (stickers[playerId] || []).map((item) => (
      {
        season:restfulUri(request, 'seasons', item.seasonId),
        team: restfulUri(request, 'teams', item.teamId),
        url: item.sticker,
      }
    ))

    response.json({ playerId, ...player, history, stats, album })
  } else {
    response.sendStatus(404)
  }
}

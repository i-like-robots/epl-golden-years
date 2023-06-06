const { squads, managers } = require('../dataset')
const { seasonUrl, teamUrl, playerUrl, managerUrl, teamSquadUrl } = require('../lib/urls')
const pick = require('../lib/object-pick')
const get = require('../lib/object-get')

module.exports = function teamSquadRoute(request, response) {
  const { teamId, seasonId } = request.params

  const teamSquads = squads.reduce((acc, squad) => {
    if (squad.teamId === teamId) {
      acc[squad.seasonId] = squad
    }

    return acc
  }, {})

  const squad = get(teamSquads, seasonId)

  if (squad) {
    const players = squad.players.map((player) => ({
      player: playerUrl(player.playerId),
      ...pick(player, 'appearances', 'cleanSheets', 'goals', 'assists'),
    }))

    const managerIds = Object.keys(managers).filter((managerId) => {
      const manager = managers[managerId]
      return manager.history.some((h) => h.teamId === teamId && h.seasonId === seasonId)
    })

    const seasonIds = Object.keys(teamSquads)
    const seasonIndex = seasonIds.indexOf(seasonId)
    const nextId = seasonIds[seasonIndex + 1]
    const previousId = seasonIds[seasonIndex - 1]

    response.send({
      season: seasonUrl(squad.seasonId),
      team: teamUrl(squad.teamId),
      players,
      managers: managerIds.map(managerUrl),
      links: {
        previous: previousId ? teamSquadUrl(teamId, previousId) : null,
        next: nextId ? teamSquadUrl(teamId, nextId) : null,
      },
    })
  } else {
    response.code(404)
    response.send({ error: 'Squad not found' })
  }
}

const squads = require('../../data/squads.json')

module.exports = function squadRoute(request, response) {
  const squad = squads.find((squad) => {
    return squad.teamId === request.params.teamId && squad.seasonId === request.params.seasonId
  })

  if (squad) {
    response.json(squad)
  } else {
    response.sendStatus(404)
  }
}

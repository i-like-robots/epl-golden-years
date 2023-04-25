const { hatTricks, tables } = require('../dataset')
const { SEASON_ID } = require('../lib/constants')
const { playerUrl, seasonUrl, teamUrl } = require('../lib/urls')

const seasonHatTricksRouteOptions = {
  schema: {
    params: {
      seasonId: {
        type: 'string',
        pattern: SEASON_ID,
      },
    },
  },
}

function seasonHatTricksRouteHandler(request, response) {
  const { seasonId } = request.params
  const table = tables[seasonId]

  if (table) {
    const data = []

    hatTricks.forEach((hatTrick) => {
      if (hatTrick.seasonId === seasonId) {
        data.push({
          player: playerUrl(hatTrick.playerId),
          homeTeam: teamUrl(hatTrick.homeTeamId),
          awayTeam: teamUrl(hatTrick.awayTeamId),
          date: hatTrick.date,
        })
      }
    })

    response.send({ season: seasonUrl(seasonId), hatTricks: data })
  } else {
    response.code(404)
    response.send({ error: 'Season not found' })
  }
}

module.exports = [seasonHatTricksRouteOptions, seasonHatTricksRouteHandler]

const { tables } = require('../dataset')
const { SEASON_ID } = require('../lib/constants')
const {
  seasonHatTricksUrl,
  seasonTableUrl,
  seasonTopScorersUrl,
  seasonTopAssistsUrl,
} = require('../lib/urls')

const routeOptions = {
  schema: {
    params: {
      seasonId: {
        type: 'string',
        pattern: SEASON_ID,
      },
    },
  },
}

function routeHandler(request, response) {
  const { seasonId } = request.params
  const table = tables[seasonId]

  if (table) {
    const seasonData = {
      table: seasonTableUrl(seasonId),
      topScorers: seasonTopScorersUrl(seasonId),
      topAssists: seasonTopAssistsUrl(seasonId),
      hatTricks: seasonHatTricksUrl(seasonId),
    }

    response.send(seasonData)
  } else {
    response.code(404)
    response.send({ error: 'Season not found' })
  }
}

module.exports = { routeOptions, routeHandler }

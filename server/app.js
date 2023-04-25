const {
  playerRoute,
  playersRoute,
  playerAlbumRoute,
  playerStatsRoute,
  seasonsRoute,
  seasonRoute,
  seasonHatTricksRoute,
  seasonTableRoute,
  seasonTopAssistsRoute,
  seasonTopScorersRoute,
  teamRoute,
  teamsRoute,
  teamSquadsRoute,
  teamSquadRoute,
  teamStatsRoute,
} = require('./routes')
const { playersUrl, teamsUrl, seasonsUrl } = require('./lib/urls')

const app = require('fastify')({
  logger: true,
})

app.get('/', (request, response) => {
  response.send({
    players: playersUrl(),
    teams: teamsUrl(),
    seasons: seasonsUrl(),
  })
})

app.get('/players', playersRoute.routeOptions, playersRoute.routeHandler)

app.get('/players/:playerId', playerRoute.routeOptions, playerRoute.routeHandler)

app.get('/players/:playerId/album', playerAlbumRoute.routeOptions, playerAlbumRoute.routeHandler)

app.get('/players/:playerId/stats', playerStatsRoute.routeOptions, playerStatsRoute.routeHandler)

app.get('/teams', teamsRoute.routeOptions, teamsRoute.routeHandler)

app.get('/teams/:teamId', teamRoute.routeOptions, teamRoute.routeHandler)

app.get('/teams/:teamId/squads', teamSquadsRoute.routeOptions, teamSquadsRoute.routeHandler)

app.get('/teams/:teamId/squads/:seasonId', teamSquadRoute.routeOptions, teamSquadRoute.routeHandler)

app.get('/teams/:teamId/stats', teamStatsRoute.routeOptions, teamStatsRoute.routeHandler)

app.get('/seasons', seasonsRoute.routeOptions, seasonsRoute.routeHandler)

app.get('/seasons/:seasonId', seasonRoute.routeOptions, seasonRoute.routeHandler)

app.get(
  '/seasons/:seasonId/hat-tricks',
  seasonHatTricksRoute.routeOptions,
  seasonHatTricksRoute.routeHandler
)

app.get('/seasons/:seasonId/table', seasonTableRoute.routeOptions, seasonTableRoute.routeHandler)

app.get(
  '/seasons/:seasonId/top-scorers',
  seasonTopScorersRoute.routeOptions,
  seasonTopScorersRoute.routeHandler
)

app.get(
  '/seasons/:seasonId/top-assists',
  seasonTopAssistsRoute.routeOptions,
  seasonTopAssistsRoute.routeHandler
)

module.exports = app

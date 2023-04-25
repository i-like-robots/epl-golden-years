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

app.get('/players/:playerId/statistics', playerStatsRoute.routeOptions, playerStatsRoute.routeHandler)

app.get('/teams', teamsRoute)

app.get('/teams/:teamId', teamRoute)

app.get('/teams/:teamId/squads', teamSquadsRoute)

app.get('/teams/:teamId/squads/:seasonId', teamSquadRoute)

app.get('/teams/:teamId/statistics', teamStatsRoute)

app.get('/seasons', seasonsRoute)

app.get('/seasons/:seasonId', seasonRoute)

app.get('/seasons/:seasonId/hat-tricks', seasonHatTricksRoute)

app.get('/seasons/:seasonId/table', seasonTableRoute)

app.get('/seasons/:seasonId/top-scorers', seasonTopScorersRoute)

app.get('/seasons/:seasonId/top-assists', seasonTopAssistsRoute)

module.exports = app

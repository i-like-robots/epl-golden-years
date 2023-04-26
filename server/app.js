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
const {
  playerAlbumSchema,
  playerSchema,
  playerStatsSchema,
  playersSchema,
  seasonHatTricksSchema,
  seasonsSchema,
  seasonTableSchema,
  seasonSchema,
  seasonTopAssistsSchema,
  seasonTopScorersSchema,
} = require('./schemas')
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

app.get('/players', { schema: playersSchema }, playersRoute)

app.get('/players/:playerId', { schema: playerSchema }, playerRoute)

app.get('/players/:playerId/album', { schema: playerAlbumSchema }, playerAlbumRoute)

app.get('/players/:playerId/stats', { schema: playerStatsSchema }, playerStatsRoute)

app.get('/teams', ...teamsRoute)

app.get('/teams/:teamId', ...teamRoute)

app.get('/teams/:teamId/squads', ...teamSquadsRoute)

app.get('/teams/:teamId/squads/:seasonId', ...teamSquadRoute)

app.get('/teams/:teamId/stats', ...teamStatsRoute)

app.get('/seasons', { schema: seasonsSchema }, seasonsRoute)

app.get('/seasons/:seasonId', { schema: seasonSchema }, seasonRoute)

app.get('/seasons/:seasonId/hat-tricks', { schema: seasonHatTricksSchema }, seasonHatTricksRoute)

app.get('/seasons/:seasonId/table', { schema: seasonTableSchema }, seasonTableRoute)

app.get('/seasons/:seasonId/top-assists', { schema: seasonTopAssistsSchema }, seasonTopAssistsRoute)

app.get('/seasons/:seasonId/top-scorers', { schema: seasonTopScorersSchema }, seasonTopScorersRoute)

module.exports = app

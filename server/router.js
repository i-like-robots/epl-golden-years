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
  rootRoute,
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
  teamSchema,
  teamsSchema,
  teamStatsSchema,
  teamSquadsSchema,
  teamSquadSchema,
  rootSchema,
} = require('./schemas')

module.exports = function router(app) {
  app.get('/', { schema: rootSchema }, rootRoute)

  app.get('/players', { schema: playersSchema }, playersRoute)

  app.get('/players/:playerId', { schema: playerSchema }, playerRoute)

  app.get('/players/:playerId/album', { schema: playerAlbumSchema }, playerAlbumRoute)

  app.get('/players/:playerId/statistics', { schema: playerStatsSchema }, playerStatsRoute)

  app.get('/teams', { schema: teamsSchema }, teamsRoute)

  app.get('/teams/:teamId', { schema: teamSchema }, teamRoute)

  app.get('/teams/:teamId/squads', { schema: teamSquadsSchema }, teamSquadsRoute)

  app.get('/teams/:teamId/squads/:seasonId', { schema: teamSquadSchema }, teamSquadRoute)

  app.get('/teams/:teamId/statistics', { schema: teamStatsSchema }, teamStatsRoute)

  app.get('/seasons', { schema: seasonsSchema }, seasonsRoute)

  app.get('/seasons/:seasonId', { schema: seasonSchema }, seasonRoute)

  app.get('/seasons/:seasonId/hat-tricks', { schema: seasonHatTricksSchema }, seasonHatTricksRoute)

  app.get('/seasons/:seasonId/table', { schema: seasonTableSchema }, seasonTableRoute)

  app.get(
    '/seasons/:seasonId/top-assists',
    { schema: seasonTopAssistsSchema },
    seasonTopAssistsRoute
  )

  app.get(
    '/seasons/:seasonId/top-scorers',
    { schema: seasonTopScorersSchema },
    seasonTopScorersRoute
  )

  return app
}

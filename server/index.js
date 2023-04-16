// const express = require('express')
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
} = require('./routes')
const { playersUrl, teamsUrl, seasonsUrl } = require('./lib/urls')

const app = require('fastify')({
  logger: true
})

app.get('/', (request, response) => {
  response.send({
    players: playersUrl(),
    teams: teamsUrl(),
    seasons: seasonsUrl(),
  })
})

app.get('/players', playersRoute)

app.get('/players/:playerId', playerRoute)

app.get('/players/:playerId/album', playerAlbumRoute)

app.get('/players/:playerId/statistics', playerStatsRoute)

app.get('/teams', teamsRoute)

app.get('/teams/:teamId', teamRoute)

app.get('/teams/:teamId/squads', teamSquadsRoute)

app.get('/teams/:teamId/squads/:seasonId', teamSquadRoute)

app.get('/seasons', seasonsRoute)

app.get('/seasons/:seasonId', seasonRoute)

app.get('/seasons/:seasonId/hat-tricks', seasonHatTricksRoute)

app.get('/seasons/:seasonId/table', seasonTableRoute)

app.get('/seasons/:seasonId/top-scorers', seasonTopScorersRoute)

app.get('/seasons/:seasonId/top-assists', seasonTopAssistsRoute)

app.listen({ port: process.env.PORT || 3000 }, (error) => {
  if (error) {
    app.log.error(error)
    process.exit(1)
  }

  app.log.info('App is listening at http://localhost:3000')
})

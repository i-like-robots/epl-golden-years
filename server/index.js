const express = require('express')
const {
  playerRoute,
  playersRoute,
  seasonsRoute,
  seasonRoute,
  seasonTableRoute,
  teamRoute,
  teamsRoute,
  teamSquadsRoute,
  teamSquadRoute,
} = require('./routes')
const baseUrl = require('./lib/baseUrl')

const app = express()

app.get('/', (request, response) => {
  response.json({
    players: baseUrl(request, 'players'),
    teams: baseUrl(request, 'teams'),
    seasons: baseUrl(request, 'seasons'),
  })
})

app.get('/players', playersRoute)

app.get('/players/:playerId', playerRoute)

app.get('/teams', teamsRoute)

app.get('/teams/:teamId', teamRoute)

app.get('/teams/:teamId/squads', teamSquadsRoute)

app.get('/teams/:teamId/squads/:seasonId', teamSquadRoute)

app.get('/seasons', seasonsRoute)

app.get('/seasons/:seasonId', seasonRoute)

app.get('/seasons/:seasonId/table', seasonTableRoute)

app.listen(3000, () => {
  console.log('App is listening at http://localhost:3000')
})

const express = require('express')
const {
  playerRoute,
  playersRoute,
  seasonsRoute,
  seasonRoute,
  squadRoute,
  tableRoute,
  tablesRoute,
  teamRoute,
  teamsRoute,
  teamSquadsRoute,
  teamSquadRoute,
} = require('./routes')

const app = express()

app.get('/', (request, response) => {
  response.send('Home page')
})

app.get('/players', playersRoute)

app.get('/players/:playerId', playerRoute)

app.get('/teams', teamsRoute)

app.get('/teams/:teamId', teamRoute)

app.get('/teams/:teamId/squads', teamSquadsRoute)

app.get('/teams/:teamId/squads/:seasonId', teamSquadRoute)

app.get('/tables', tablesRoute)

app.get('/tables/:tableId', tableRoute)

app.get('/seasons', seasonsRoute)

app.get('/seasons/:seasonId', seasonRoute)

// app.get('/seasons/:seasonId/table', seasonRoute)

app.listen(3000, () => {
  console.log('App is listening at http://localhost:3000')
})

const express = require('express')
const {
  playerRoute, 
  playersRoute, 
  seasonsRoute,
  seasonRoute,
  squadRoute, 
  squadsBySeasonRoute,
  squadsRoute,
  tableRoute, 
  tablesRoute,
  teamRoute, 
  teamsRoute,
} = require('./routes')

const app = express()

app.get('/', (request, response) => {
  response.send('Home page')
})

app.get('/players', playersRoute)

app.get('/players/:playerId', playerRoute)

app.get('/teams', teamsRoute)

app.get('/teams/:teamId', teamRoute)

app.get('/tables', tablesRoute)

app.get('/tables/:seasonId', tableRoute)

app.get('/seasons', seasonsRoute)

app.get('/seasons/:seasonId', seasonRoute)

app.get('/squads', squadsRoute)

app.get('/squads/:seasonId', squadsBySeasonRoute)

app.get('/squads/:seasonId/:teamId', squadRoute)

app.listen(3000, () => {
  console.log('App is listening at http://localhost:3000')
})

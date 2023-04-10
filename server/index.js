const express = require('express')
const {
  playerRoute, 
  playersRoute, 
  squadRoute, 
  squadsRoute,
  tableRoute, 
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

app.get('/table/:seasonId', tableRoute)

app.get('/squads', squadsRoute)

app.get('/squads/:teamId/:seasonId', squadRoute)

app.listen(3000, () => {
  console.log('App is listening at http://localhost:3000')
})

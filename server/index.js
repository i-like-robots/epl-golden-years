const express = require('express')
const { playerRoute, teamRoute, tableRoute, squadRoute } = require('./routes')

const app = express()

app.get('/', (request, response) => {
  response.send('Home page')
})

app.get('/player/:playerId', playerRoute)

app.get('/team/:teamId', teamRoute)

app.get('/table/:seasonId', tableRoute)

app.get('/squad/:teamId/:seasonId', squadRoute)

app.listen(3000, () => {
  console.log('App is listening at http://localhost:3000')
})

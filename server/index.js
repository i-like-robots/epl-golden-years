const express = require('express')

const teams = require('../data/teams.json')
const squads = require('../data/squads.json')
const players = require('../data/players.json')

const app = express()

app.get('/', (request, response) => {
  response.send('Home page')
})

app.get('/player/:id', (request, response) => {
  const player = players[request.params.id]

  if (player) {
    response.json(player)
  } else {
    response.sendStatus(404)
  }
})

app.get('/team/:id', (request, response) => {
  const team = teams[request.params.id]

  if (team) {
    response.json(team)
  } else {
    response.sendStatus(404)
  }
})

app.get('/squad/:teamId/:seasonId', (request, response) => {
  const squad = squads.find((squad) => {
    return squad.teamId === request.params.teamId && squad.seasonId === request.params.seasonId
  })

  const squadData = squad.players.map((p) => {
    const player = players[p.playerId]
    return { ...p, ...player }
  })

  response.json(squadData)
})

app.listen(3000, () => {
  console.log('App is listening at http://localhost:3000')
})

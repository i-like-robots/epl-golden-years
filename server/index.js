const express = require('express')

const teams = require('../data/teams.json')
const squads = require('../data/squads.json')
const players = require('../data/players.json')

const app = express()

app.get('/', (request, response) => {
  response.send('Home page')
})

app.get('/player/:id', (request, response) => {
  const id = Number(request.params.id)

  const player = players.find((player) => {
    return player.pulseId === id
  })

  if (player) {
    response.json(player)
  } else {
    response.sendStatus(404)
  }
})

app.get('/team/:id', (request, response) => {
  const id = Number(request.params.id)

  const team = teams.find((team) => {
    return team.pulseId === id
  })

  if (team) {
    response.json(team)
  } else {
    response.sendStatus(404)
  }
})

app.get('/squad/:teamId/:seasonId', (request, response) => {
  const teamId = Number(request.params.teamId)
  const seasonId = Number(request.params.seasonId)

  const squad = squads.find((squad) => {
    return squad.teamPulseId === teamId && squad.seasonId === seasonId
  })

  const playersData = squad.players.map((squadPlayer) => {
    const player = players.find((player) => {
      return player.pulseId === squadPlayer.pulseId
    })

    return { ...squadPlayer, ...player }
  })

  response.json(playersData)
})

app.listen(3000, () => {
  console.log('App is listening at http://localhost:3000')
})

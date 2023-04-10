const express = require('express')

const teams = require('../data/teams.json')
const squads = require('../data/squads.json')
const tables = require('../data/tables.json')
const players = require('../data/players.json')

const { playerRoute } = require('./routes')

const app = express()

app.get('/', (request, response) => {
  response.send('Home page')
})

app.get('/player/:playerId', playerRoute)

app.get('/team/:teamId', (request, response) => {
  const teamId = request.params.teamId
  const team = teams[teamId]

  if (team) {
    const resultHistory = Object.keys(tables).filter((seasonId) =>
      tables[seasonId].some((t) => t.teamId === teamId)
    )

    const history = []

    const stats = {
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      for: 0,
      against: 0,
    }

    resultHistory.forEach((seasonId) => {
      const result = tables[seasonId].find((t) => t.teamId === teamId)

      history.push({ seasonId, ...result, teamId: undefined })

      stats.played += result.played
      stats.wins += result.wins
      stats.draws += result.draws
      stats.losses += result.losses
      stats.for += result.for
      stats.against += result.against
    })

    response.json({ ...team, history, stats })
  } else {
    response.sendStatus(404)
  }
})

app.get('/table/:seasonId', (request, response) => {
  const table = tables[request.params.seasonId]

  if (table) {
    const tableData = table.map((t) => {
      const team = teams[t.teamId]
      return { ...t, ...team }
    })

    response.json(tableData)
  } else {
    response.sendStatus(404)
  }
})

app.get('/squad/:teamId', (request, response) => {
  const team = teams[request.params.teamId]

  if (team) {
    const seasons = squads
      .filter((squad) => squad.teamId === request.params.teamId)
      .map((squad) => squad.seasonId)

    response.json({ seasons })
  } else {
    response.sendStatus(404)
  }

  const squad = squads.find((squad) => {
    return squad.teamId === request.params.teamId && squad.seasonId === request.params.seasonId
  })

  if (squad) {
    const squadData = squad.players.map((p) => {
      const player = players[p.playerId]
      return { ...p, ...player }
    })

    response.json(squadData)
  } else {
    response.sendStatus(404)
  }
})

app.get('/squad/:teamId/:seasonId', (request, response) => {
  const squad = squads.find((squad) => {
    return squad.teamId === request.params.teamId && squad.seasonId === request.params.seasonId
  })

  if (squad) {
    const squadData = squad.players.map((p) => {
      const player = players[p.playerId]
      return { ...p, ...player }
    })

    response.json(squadData)
  } else {
    response.sendStatus(404)
  }
})

app.listen(3000, () => {
  console.log('App is listening at http://localhost:3000')
})

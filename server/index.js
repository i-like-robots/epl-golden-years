const express = require('express')

const teams = require('../data/teams.json')
const squads = require('../data/squads.json')
const tables = require('../data/tables.json')
const players = require('../data/players.json')
const stickers = require('../data/stickers.json')

const app = express()

app.get('/', (request, response) => {
  response.send('Home page')
})

app.get('/player/:playerId', (request, response) => {
  const playerId = request.params.playerId
  const player = players[playerId]

  if (player) {
    const squadHistory = squads.filter((squad) =>
      squad.players.some((p) => p.playerId === playerId)
    )

    const history = []
    const stats = { appearances: 0, cleanSheets: 0, goals: 0 }

    squadHistory.forEach((squad) => {
      const team = teams[squad.teamId]
      const table = tables[squad.seasonId]
      const result = table.find((t) => t.teamId === squad.teamId)
      const member = squad.players.find((p) => p.playerId === playerId)

      history.push({
        ...team,
        optaId: undefined,
        pulseId: undefined,
        rank: result.rank,
        seasonId: squad.seasonId,
        appearances: member.appearances,
        cleanSheets: member.cleanSheets,
        goals: member.goals,
    })

      stats.appearances += member.appearances
      stats.cleanSheets += member.cleanSheets
      stats.goals += member.goals
    })

    const album = stickers[playerId] || null

    response.json({ ...player, history, stats, album })
  } else {
    response.sendStatus(404)
  }
})

app.get('/team/:teamId', (request, response) => {
  const teamId = request.params.teamId
  const team = teams[request.params.teamId]

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

      history.push({ ...result, seasonId, teamId: undefined })

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

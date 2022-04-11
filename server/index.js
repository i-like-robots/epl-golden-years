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

    const stats = { appearances: 0, cleanSheets: 0, goals: 0 }

    const history = squadHistory.map((squad) => {
      const team = teams[squad.teamId]
      const table = tables[squad.seasonId]
      const result = table.find((t) => t.teamId === squad.teamId)
      const squadPlayer = squad.players.find((p) => p.playerId === playerId)

      stats.appearances += squadPlayer.appearances
      stats.cleanSheets += squadPlayer.cleanSheets
      stats.goals += squadPlayer.goals

      return {
        ...team,
        rank: result.rank,
        seasonId: squad.seasonId,
        appearances: squadPlayer.appearances,
        cleanSheets: squadPlayer.cleanSheets,
        goals: squadPlayer.goals,
      }
    })

    const sticker = stickers[player.optaId]

    response.json({ ...player, history, stats, sticker })
  } else {
    response.sendStatus(404)
  }
})

app.get('/team/:teamId', (request, response) => {
  const team = teams[request.params.teamId]

  if (team) {
    response.json(team)
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

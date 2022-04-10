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

    const history = squadHistory.map((squad) => {
      const team = teams[squad.teamId]
      const table = tables[squad.seasonId]
      const result = table.find((item) => item.teamId === squad.teamId)
      const stats = squad.players.find((p) => p.playerId === playerId)

      return {
        ...team,
        rank: result.rank,
        seasonId: squad.seasonId,
        appearances: stats.appearances,
      }
    })

    const sticker = stickers[player.optaId]

    const appearances = history.reduce((acc, item) => acc + item.appearances, 0)

    response.json({ ...player, history, appearances, sticker })
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

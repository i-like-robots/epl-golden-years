const teams = require('../data/teams.json')
const squads = require('../data/squads.json')
const tables = require('../data/tables.json')
const players = require('../data/players.json')
const stickers = require('../data/stickers.json')

const fs = require('fs')
const db = require('better-sqlite3')('./db/epl.db')

const schema = fs.readFileSync('./db/schema.sql', 'utf-8')
db.exec(schema)

const insertPlayers = db.prepare(`
    INSERT INTO players VALUES (
      $id,
      $pulseId,
      $optaId,
      $firstName,
      $lastName,
      $dateOfBirth,
      $countryCode,
      $countryName,
      $positionCode,
      $positionName,
      $sticker
    )
  `)

const insertManyPlayers = db.transaction((data) => {
  data.forEach((item) => {
    const sticker = stickers[item.optaId]
    insertPlayers.run({ ...item, sticker })
  })
})

insertManyPlayers(players)

const insertTeams = db.prepare(`
    INSERT INTO teams VALUES (
      $id,
      $pulseId,
      $optaId,
      $name,
      $shortName
    )
  `)

const insertManyTeams = db.transaction((data) => {
  data.forEach((item) => insertTeams.run(item))
})

insertManyTeams(teams)

const insertSquads = db.prepare(`
    INSERT INTO squads VALUES (
      $seasonId,
      $teamId,
      $playerId,
      $appearances,
      $cleanSheets,
      $goals
    )
  `)

const insertManySquads = db.transaction((data) => {
  data.forEach((squad) => {
    const { seasonId, teamId } = squad

    squad.players.forEach((player) => {
      insertSquads.run({ seasonId, teamId, ...player })
    })
  })
})

insertManySquads(squads)

const insertTables = db.prepare(`
    INSERT INTO tables VALUES (
      $seasonId,
      $teamId,
      $rank,
      $points,
      $played,
      $wins,
      $draws,
      $losses,
      $for,
      $against,
      $diff
    )
  `)

const insertManyTables = db.transaction((data) => {
  data.forEach((table) => {
    table.forEach((row) => insertTables.run(row))
  })
})

insertManyTables(tables)

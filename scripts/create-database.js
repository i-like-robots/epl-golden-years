const teams = require('../data/teams.json')
const squads = require('../data/squads.json')
const players = require('../data/players.json')
const stickers = require('../data/stickers.json')

const fs = require('fs')
const db = require('better-sqlite3')('./db/epl.db')

function setup() {
  const schema = fs.readFileSync('./db/schema.sql', 'utf-8')
  db.exec(schema)
}

function seedPlayers() {
  const insert = db.prepare(`
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

  const insertMany = db.transaction((data) => {
    data.forEach((item) => {
      const sticker = stickers[item.optaId]
      insert.run({ ...item, sticker })
    })
  })

  insertMany(players)
}

function seedTeams() {
  const insert = db.prepare(`
    INSERT INTO teams VALUES (
      $id,
      $pulseId,
      $optaId,
      $name,
      $shortName
    )
  `)

  const insertMany = db.transaction((data) => {
    data.forEach((item) => insert.run(item))
  })

  insertMany(teams)
}

function seedSquads() {
  const insert = db.prepare(`
    INSERT INTO squads VALUES (
      $seasonId,
      $teamId,
      $playerId,
      $appearances,
      $cleanSheets,
      $goals
    )
  `)

  const insertMany = db.transaction((data) => {
    data.forEach((squad) => {
      squad.players.forEach((player) => {
        const { seasonId, teamId } = squad
        insert.run({ seasonId, teamId, ...player })
      })
    })
  })

  insertMany(squads)
}

setup()
seedPlayers()
seedTeams()
seedSquads()

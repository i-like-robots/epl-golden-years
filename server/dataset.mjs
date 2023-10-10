import fs from 'fs'
import url from 'url'
import path from 'path'

function resolveFile(fileName) {
  const dirname = url.fileURLToPath(path.dirname(import.meta.url))
  return path.join(dirname, '..', 'data', fileName)
}

function loadJSON(fileName) {
  const fullPath = resolveFile(fileName)
  const contents = fs.readFileSync(fullPath, 'utf-8')
  return JSON.parse(contents)
}

export const hatTricks = loadJSON('hat-tricks.json')
export const managers = loadJSON('managers.json')
export const players = loadJSON('players.json')
export const seasons = loadJSON('seasons.json')
export const stickers = loadJSON('laststicker.json')
export const squads = loadJSON('squads.json')
export const tables = loadJSON('tables.json')
export const teams = loadJSON('teams.json')

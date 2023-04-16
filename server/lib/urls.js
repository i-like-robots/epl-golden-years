const join = require('url-join')

const API_URL = process.env.BASE_URL || 'http://localhost:3000/'

function playersUrl() {
  return join(API_URL, '/players')
}

function playerUrl(playerId) {
  return join(API_URL, '/players', playerId)
}

function teamsUrl() {
  return join(API_URL, '/teams',)
}

function teamUrl(teamId) {
  return join(API_URL, '/teams', teamId)
}

function teamSquadsUrl(teamId) {
  return join(API_URL, '/teams/', teamId, '/squads')
}

function teamSquadUrl(teamId, seasonId) {
  return join(API_URL, '/teams/', teamId, '/squads', seasonId)
}

function seasonsUrl() {
  return join(API_URL, '/seasons',)
}

function seasonUrl(seasonId) {
  return join(API_URL, '/seasons', seasonId)
}

function seasonTableUrl(seasonId) {
  return join(API_URL, '/seasons', seasonId, '/table')
}

function seasonTopAssistsUrl(seasonId) {
  return join(API_URL, '/seasons', seasonId, '/top-assists')
}

function seasonTopScorersUrl(seasonId) {
  return join(API_URL, '/seasons', seasonId, '/top-scorers')
}

module.exports = {
  playersUrl,
  playerUrl,
  teamsUrl,
  teamUrl,
  teamSquadsUrl,
  teamSquadUrl,
  seasonsUrl,
  seasonUrl,
  seasonTableUrl,
  seasonTopAssistsUrl,
  seasonTopScorersUrl,
}

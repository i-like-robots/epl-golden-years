const join = require('url-join')
const { API_URL } = require('../lib/constants')

function playersUrl() {
  return join(API_URL, '/players')
}

function playerUrl(playerId) {
  return join(API_URL, '/players', playerId)
}

function playerAlbumUrl(playerId) {
  return join(API_URL, '/players', playerId, '/album')
}

function playerStatsUrl(playerId) {
  return join(API_URL, '/players', playerId, '/statistics')
}

function teamsUrl() {
  return join(API_URL, '/teams')
}

function teamUrl(teamId) {
  return join(API_URL, '/teams', teamId)
}

function teamSquadsUrl(teamId) {
  return join(API_URL, '/teams', teamId, '/squads')
}

function teamSquadUrl(teamId, seasonId) {
  return join(API_URL, '/teams', teamId, '/squads', seasonId)
}

function teamStatsUrl(teamId) {
  return join(API_URL, '/teams', teamId, '/statistics')
}

function seasonsUrl() {
  return join(API_URL, '/seasons')
}

function seasonUrl(seasonId) {
  return join(API_URL, '/seasons', seasonId)
}

function seasonHatTricksUrl(seasonId) {
  return join(API_URL, '/seasons', seasonId, '/hat-tricks')
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
  playerAlbumUrl,
  playerStatsUrl,
  teamsUrl,
  teamUrl,
  teamSquadsUrl,
  teamSquadUrl,
  teamStatsUrl,
  seasonsUrl,
  seasonUrl,
  seasonHatTricksUrl,
  seasonTableUrl,
  seasonTopAssistsUrl,
  seasonTopScorersUrl,
}

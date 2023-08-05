const join = require('url-join')
const { API_URL } = require('../lib/constants')

function playersUrl() {
  return join(API_URL, '/rest/players')
}

function playerUrl(playerId) {
  return join(API_URL, '/rest/players', playerId)
}

function playerAlbumUrl(playerId) {
  return join(API_URL, '/rest/players', playerId, '/album')
}

function playerStatsUrl(playerId) {
  return join(API_URL, '/rest/players', playerId, '/stats')
}

function teamsUrl() {
  return join(API_URL, '/rest/teams')
}

function teamUrl(teamId) {
  return join(API_URL, '/rest/teams', teamId)
}

function teamSquadsUrl(teamId) {
  return join(API_URL, '/rest/teams', teamId, '/squads')
}

function teamSquadUrl(teamId, seasonId) {
  return join(API_URL, '/rest/teams', teamId, '/squads', seasonId)
}

function teamStatsUrl(teamId) {
  return join(API_URL, '/rest/teams', teamId, '/stats')
}

function seasonsUrl() {
  return join(API_URL, '/rest/seasons')
}

function seasonUrl(seasonId) {
  return join(API_URL, '/rest/seasons', seasonId)
}

function seasonHatTricksUrl(seasonId) {
  return join(API_URL, '/rest/seasons', seasonId, '/hat-tricks')
}

function seasonTableUrl(seasonId) {
  return join(API_URL, '/rest/seasons', seasonId, '/table')
}

function seasonTopAssistsUrl(seasonId) {
  return join(API_URL, '/rest/seasons', seasonId, '/top-assists')
}

function seasonTopCleanSheetsUrl(seasonId) {
  return join(API_URL, '/rest/seasons', seasonId, '/top-clean-sheets')
}

function seasonTopScorersUrl(seasonId) {
  return join(API_URL, '/rest/seasons', seasonId, '/top-scorers')
}

function managersUrl() {
  return join(API_URL, '/rest/managers')
}

function managerUrl(managerId) {
  return join(API_URL, '/rest/managers', managerId)
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
  seasonTopCleanSheetsUrl,
  seasonTopScorersUrl,
  managersUrl,
  managerUrl,
}

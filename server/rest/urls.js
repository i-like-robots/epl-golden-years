import join from 'url-join'
import { API_URL } from '../lib/constants.js'

export function playersUrl() {
  return join(API_URL, '/rest/players')
}

export function playerUrl(playerId) {
  return join(API_URL, '/rest/players', playerId)
}

export function playerAlbumUrl(playerId) {
  return join(API_URL, '/rest/players', playerId, '/album')
}

export function playerStatsUrl(playerId) {
  return join(API_URL, '/rest/players', playerId, '/stats')
}

export function teamsUrl() {
  return join(API_URL, '/rest/teams')
}

export function teamUrl(teamId) {
  return join(API_URL, '/rest/teams', teamId)
}

export function teamSquadsUrl(teamId) {
  return join(API_URL, '/rest/teams', teamId, '/squads')
}

export function teamSquadUrl(teamId, seasonId) {
  return join(API_URL, '/rest/teams', teamId, '/squads', seasonId)
}

export function teamStatsUrl(teamId) {
  return join(API_URL, '/rest/teams', teamId, '/stats')
}

export function seasonsUrl() {
  return join(API_URL, '/rest/seasons')
}

export function seasonUrl(seasonId) {
  return join(API_URL, '/rest/seasons', seasonId)
}

export function seasonHatTricksUrl(seasonId) {
  return join(API_URL, '/rest/seasons', seasonId, '/hat-tricks')
}

export function seasonTableUrl(seasonId) {
  return join(API_URL, '/rest/seasons', seasonId, '/table')
}

export function seasonTopAssistsUrl(seasonId) {
  return join(API_URL, '/rest/seasons', seasonId, '/top-assists')
}

export function seasonTopCleanSheetsUrl(seasonId) {
  return join(API_URL, '/rest/seasons', seasonId, '/top-clean-sheets')
}

export function seasonTopScorersUrl(seasonId) {
  return join(API_URL, '/rest/seasons', seasonId, '/top-scorers')
}

export function managersUrl() {
  return join(API_URL, '/rest/managers')
}

export function managerUrl(managerId) {
  return join(API_URL, '/rest/managers', managerId)
}

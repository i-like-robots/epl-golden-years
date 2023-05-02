const API_URL = process.env.BASE_URL || 'http://localhost:3000/'

const PLAYER_ID = '^[a-z]+-[a-z]+-[a-z0-9]{4}$'

const PLAYER_POSITIONS = ['G', 'D', 'M', 'F']

const SEASON_ID = '^\\d{4}-\\d{4}$'

const TEAM_ID = '^[a-z]{3}$'

module.exports = { API_URL, PLAYER_ID, PLAYER_POSITIONS, SEASON_ID, TEAM_ID }

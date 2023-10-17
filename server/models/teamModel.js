import { teams } from '../dataset.js'
import get from '../lib/object-get.js'

export default function teamModel(teamId) {
  return get(teams, teamId)
}

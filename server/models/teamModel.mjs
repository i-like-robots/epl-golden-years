import { teams } from '../dataset.mjs'
import get from '../lib/object-get.mjs'

export default function teamModel(teamId) {
  return get(teams, teamId)
}

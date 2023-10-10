import { squads } from '../dataset.mjs'

export default function teamSquadModel(teamId, seasonId) {
  return squads.find((squad) => squad.teamId === teamId && squad.seasonId === seasonId)
}

import { squads } from '../dataset.mjs'

export default function teamSquadsModel(teamId) {
  const data = []

  squads.forEach((squad) => {
    if (squad.teamId === teamId) {
      data.push({ teamId, seasonId: squad.seasonId })
    }
  })

  return data
}

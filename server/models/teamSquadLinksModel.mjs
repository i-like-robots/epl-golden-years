import { squads, teams } from '../dataset.mjs'
import get from '../lib/object-get.mjs'

export default function teamSquadLinksModel(teamId, seasonId) {
  const team = get(teams, teamId)

  if (team) {
    const seasonIds = squads.reduce((acc, squad) => {
      if (squad.teamId === teamId) {
        acc.push(squad.seasonId)
      }

      return acc
    }, [])

    const seasonIndex = seasonIds.indexOf(seasonId)
    const nextId = seasonIds[seasonIndex + 1] || null
    const previousId = seasonIds[seasonIndex - 1] || null

    return { previousId, nextId }
  }
}

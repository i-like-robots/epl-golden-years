import { managers } from '../dataset.mjs'

export default function teamSquadManagersModel(teamId, seasonId) {
  return Object.keys(managers).filter((managerId) => {
    const manager = managers[managerId]
    return manager.history.some((row) => row.teamId === teamId && row.seasonId === seasonId)
  })
}

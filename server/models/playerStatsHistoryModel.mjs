import { players, squads, hatTricks } from '../dataset.mjs'
import get from '../lib/object-get.mjs'

function countHatTricks(playerId, seasonId) {
  const list = hatTricks.filter(
    (hatTrick) => hatTrick.seasonId === seasonId && hatTrick.playerId === playerId
  )

  return list.length
}

export default function playerStatsHistoryModel(playerId) {
  const player = get(players, playerId)
  const history = []

  if (player) {
    squads.forEach((squad) => {
      const member = squad.players.find((player) => player.playerId === playerId)

      if (member) {
        history.push({
          seasonId: squad.seasonId,
          appearances: member.appearances,
          goals: member.goals,
          assists: member.assists,
          cleanSheets: member.cleanSheets,
          hatTricks: member.goals >= 3 ? countHatTricks(playerId, squad.seasonId) : 0,
        })
      }
    })
  }

  return history
}

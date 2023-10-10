import seasonHatTricksModel from '../../models/seasonHatTricksModel.mjs'
import { playerUrl, seasonUrl, teamUrl } from '../urls.mjs'

export default function seasonHatTricksRoute(request, response) {
  const { seasonId } = request.params
  const data = seasonHatTricksModel(seasonId)

  if (data.length) {
    const hatTricks = data.map((hatTrick) => ({
      player: playerUrl(hatTrick.playerId),
      homeTeam: teamUrl(hatTrick.homeTeamId),
      awayTeam: teamUrl(hatTrick.awayTeamId),
      date: hatTrick.date,
    }))

    response.send({ season: seasonUrl(seasonId), hatTricks })
  } else {
    response.code(404)
    response.send({ error: 'Season not found' })
  }
}

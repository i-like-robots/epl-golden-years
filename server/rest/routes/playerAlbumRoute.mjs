import playerModel from '../../models/playerModel.mjs'
import playerAlbumModel from '../../models/playerAlbumModel.mjs'
import { seasonUrl, teamUrl, playerUrl } from '../urls.mjs'

export default function playerAlbumRoute(request, response) {
  const { playerId } = request.params
  const player = playerModel(playerId)

  if (player) {
    const data = playerAlbumModel(playerId).map((sticker) => ({
      season: seasonUrl(sticker.seasonId),
      team: teamUrl(sticker.teamId),
      sticker: sticker.sticker,
    }))

    response.send({ player: playerUrl(playerId), stickers: data })
  } else {
    response.code(404)
    response.send({ error: 'Player not found' })
  }
}

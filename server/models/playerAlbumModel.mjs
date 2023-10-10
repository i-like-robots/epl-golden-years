import { stickers } from '../dataset.mjs'
import get from '../lib/object-get.mjs'

export default function playerAlbumModel(playerId) {
  return get(stickers, playerId) || []
}

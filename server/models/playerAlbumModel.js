import { stickers } from '../dataset.js'
import get from '../lib/object-get.js'

export default function playerAlbumModel(playerId) {
  return get(stickers, playerId) || []
}

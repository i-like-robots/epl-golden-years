import { hatTricks } from '../dataset.js'

export default function seasonHatTricksModel(seasonId) {
  return hatTricks.filter((hatTrick) => hatTrick.seasonId === seasonId)
}

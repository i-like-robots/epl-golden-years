import { hatTricks } from '../dataset.mjs'

export default function seasonHatTricksModel(seasonId) {
  return hatTricks.filter((hatTrick) => hatTrick.seasonId === seasonId)
}

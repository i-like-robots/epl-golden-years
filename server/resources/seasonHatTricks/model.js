const { hatTricks } = require('../../dataset')

module.exports = function seasonHatTricksModel(seasonId) {
  return hatTricks.filter((hatTrick) => hatTrick.seasonId === seasonId)
}

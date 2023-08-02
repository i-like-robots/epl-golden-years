const { GraphQLEnumType } = require('graphql')
const { POSITION_CODES, POSITION_NAMES } = require('../lib/constants')
const { arrayToEnum } = require('./utils')

const PositionCodeType = new GraphQLEnumType({
  name: 'PositionCode',
  values: arrayToEnum(POSITION_CODES),
})

const PositionNameType = new GraphQLEnumType({
  name: 'PositionName',
  values: arrayToEnum(POSITION_NAMES),
})

module.exports = { PositionCodeType, PositionNameType }

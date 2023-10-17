import { GraphQLEnumType } from 'graphql'
import { POSITION_CODES, POSITION_NAMES } from '../lib/constants.js'
import { arrayToEnum } from './utils.js'

export const PositionCodeType = new GraphQLEnumType({
  name: 'PositionCode',
  values: arrayToEnum(POSITION_CODES),
})

export const PositionNameType = new GraphQLEnumType({
  name: 'PositionName',
  values: arrayToEnum(POSITION_NAMES),
})

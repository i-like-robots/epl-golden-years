import { GraphQLEnumType } from 'graphql'
import { POSITION_CODES, POSITION_NAMES } from '../lib/constants.mjs'
import { arrayToEnum } from './utils.mjs'

export const PositionCodeType = new GraphQLEnumType({
  name: 'PositionCode',
  values: arrayToEnum(POSITION_CODES),
})

export const PositionNameType = new GraphQLEnumType({
  name: 'PositionName',
  values: arrayToEnum(POSITION_NAMES),
})

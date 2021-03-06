import { curry, } from 'ramda'

export const bitwiseAnd = curry ((a, b) => a & b)
export const bitwiseOr = curry ((a, b) => a | b)
export const bitwiseXor = curry ((a, b) => a ^ b)
export const bitwiseNot = a => ~ a
export const bitwiseLeft = curry ((a, b) => a << b)
export const bitwiseRight = curry ((a, b) => a >> b)
export const bitwiseRightZeroFill = curry ((a, b) => a >>> b)

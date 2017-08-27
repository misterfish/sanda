#!/usr/bin/env node

defineBinaryOperator ('|', (a, b) => b (a))
defineBinaryOperator ('>>', (a, b) => (...args) => b (a (...args)))

import {
    isEmpty, tap, has, hasIn, flip, fromPairs, toPairs, assoc, assocPath, head,
    tail, reduceRight, chain, identity, reduce, map, filter, reject, join,
    split, prop as rProp, path as rPath, defaultTo as rDefaultTo, curry,
    forEach as each, forEachObjIndexed as eachObj, complement, times as rTimes,
    range as rRange, isNil, addIndex, take, equals, mapAccum,
    repeat as rRepeat,
    append as rAppend,
    concat as rConcat,
    zip,
        curryN,
} from 'ramda'

import fishLib, {
    log, info, warn, error, green, yellow, magenta, brightRed, cyan, brightBlue,
    sprintf, forceColors,
} from 'fish-lib'

import { flipC, } from './index'

const argsFour = a => b => c => d => a / b + c + d

argsFour (1) (2) (3) (4)
| log // => 7.5

const flippedFour = flipC (argsFour)

flippedFour (1) (2) (3) (4)
| log // => 9

flippedFour (1, 2, 3) (4)
| log // => 9

flippedFour (1, 2, 3, 4)
| log // => 9

const sum = 0 | reduce ((a, b) => a + b)
const thing = curryN(4, (a, b, ...rest) => a + b + (rest | sum))

thing (1, 2, 3, 4)
| log

thing (1, 2, 3) (4) | log

thing (1, 2) | log

thing (1) | log

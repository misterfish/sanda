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

import { xReplace, xReplaceStr, xReplaceStrFlags, pass1, whenBind, ifBind__, ifBind, } from './index'

'lots of pigs'
| xReplace (/ (o .. p) /) ('stick')
| log // 'lots stickigs'

'lots of pigs'
| xReplace (/ (o .) /) ('po')
| log // 'lpos of pigs'

'lots of pigs'
| xReplace (/ (o .) /g) ('po')
| log // 'lpos po pigs'

'lots of pigs'
| xReplaceStr (' (o .. p) ') ('stick')
| log // 'lots stickigs'

'lots of pigs'
| xReplaceStrFlags (' (o .) ') ('') ('po')
| log // 'lpos of pigs'

'lots of pigs'
| xReplaceStrFlags (' (o .) ') ('g') ('po')
| log // 'lpos po pigs'

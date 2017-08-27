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

import { pass1, whenBind, ifBind__, ifBind, } from './index'

let formData = 'old'

const my = {
    parseFormData: formData => 'parsed ' + formData,
}

// if (my.parseFormData) {
//     formData = my.parseFormData(formData);
// }

; [my, 'parseFormData']
| ifBind (
    pass1 (formData),
    () => formData,
)
| log

; [my, 'parseFormData']
| whenBind (
    pass1 (formData),
)
| log

; [my, 'arseFormData']
| whenBind (
    pass1 (formData),
)
| log

ifBind__ (
    [my, 'parseFomData'],
    pass1 (formData),
    () => 'allen',
)
| log

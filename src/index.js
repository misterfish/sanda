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
    concat as rConcat,
    append as rAppend,
    merge as rMerge,
} from 'ramda'

import fishLib, {
    log, info, warn, error, green, yellow, magenta, brightRed, cyan, brightBlue,
    sprintf, forceColors,
} from 'fish-lib'

import {
    bitwiseAnd, bitwiseOr, bitwiseXor, bitwiseNot,
    bitwiseLeft, bitwiseRight, bitwiseRightZeroFill,
} from './operator'

export {
    bitwiseAnd, bitwiseOr, bitwiseXor, bitwiseNot,
    bitwiseLeft, bitwiseRight, bitwiseRightZeroFill,
}

export const ok = x => !isNil (x)

export const dot  = curry ((prop, o) => o[prop] ())
export const dot1 = curry ((prop, val, o) => o[prop] (val))
export const dot2 = curry ((prop, val1, val2, o) => o[prop] (val1, val2))
export const dot3 = curry ((prop, val1, val2, val3, o) => o[prop] (val1, val2, val3))
export const dotN = curry ((prop, vs, o) => o[prop] (...vs))

export const tapDot  = (prop) => tap (dot (prop))
export const tapDot1 = curry (
    (prop, val) => tap (dot1 (prop) (val))
)
export const tapDot2 = curry (
    (prop, val1, val2) => tap (dot2 (prop) (val1) (val2))
)
export const tapDot3 = curry (
    (prop, val1, val2, val3) => tap (dot3 (prop) (val1) (val2) (val3))
)
export const tapDotN = curry (
    (prop, vs) => tap (dotN (prop) (vs))
)

// --- signal intentions
export const dotMut = dot
export const dot1Mut = dot1
export const dot2Mut = dot2
export const dot3Mut = dot3
export const dotNMut = dotN

export const tapMut = tap
export const tapDotMut = tapDot
export const tapDot1Mut = tapDot1
export const tapDot2Mut = tapDot2
export const tapDot3Mut = tapDot3
export const tapDotNMut = tapDotN

export const ifOk_ = (x, yes, no) => ifOk (yes, no, x)
export const ifOk = curry ((yes, x) => ok (x) ? yes (x) : void 8)

export const ifTrue = curry ((yes, x) => x
    | condTrue (yes) (() => void 8)
)

export const condTrue = curry ((yes, no, x) => x === true
    ? yes (x) : no (x)
)
export const ifTrueElse = condTrue

// ------ not data-last.
// ------ not curried.

export const ifTrueRF = (x, yes, no = () => void 8) => x
    | condTrue (yes) (no)

export const cascade = (val, ...fxs) =>
    fxs | reduce ((a, b) => b (a), val)

// ------ bind

export const bind = curry ((o, key) => (...args) => o[key] (...args)
)
// --- hasOwn: R.has

// could also be called pushTo and pushToMut, but pushTo for not mut could be confusing.

// [1 2 3] -> [4 5 6] -> [1 2 3 [4 5 6]]
// [] -> a -> []
// export const appendTo = curry (
//     (tgt, src) => [...tgt, src]
// )

// rcvAppend?
// appendRcv?
// appendRC?
// export const appendFrom = rAppend

// ------ append.

export const appendFrom = curry ((elem, ary) =>
    [...ary, elem]
)
export const appendTo = flip (appendFrom)

// [] -> a -> [], mut
export const appendToMut = curry ((tgt, src) => {
    tgt.push (src)
    return tgt
})

// [] -> a -> [], mut
export const appendFromMut = flip (appendToMut)

// ------ prepend.

export const prependTo = curry ((ary, elem) =>
    [elem, ...ary]
)

export const prependFrom = flip (prependTo)

export const prependFromMut = curry ((src, tgt) => {
    tgt.unshift (src)
    return tgt
})

export const prependToMut = curry ((tgt, src) => {
    tgt.unshift (src)
    return tgt
})

// [1 2 3] -> [4 5 6] -> [1 2 3 4 5 6]

// [] -> [] -> []
// [] -> a -> [] => error
// String -> String -> String
export const concatTo = rConcat

export const concatFrom = flip (rConcat)

// [] -> [] -> [], mut
export const concatToMut = curry (
    (tgt, src) => {
        tgt.push (...src)
        return tgt
    }
)

export const concatFromMut = flip (concatToMut)

export const mergeTo = rMerge
export const mergeFrom = flip (rMerge)

// --- mut always refers to target.

// --- discards non-own on src.
// --- does not discard non-own on tgt, b/c mut.
export const mergeToMut = curry ((tgt, src) => {
    const ret = tgt
    for (let i in src)
        if (has (i, src))
            ret[i] = src[i]
    return ret
})

export const mergeFromMut = flip (mergeToMut)

export const injectToMut = mergeToMut
export const injectFromMut = mergeFromMut

// --- both will float.
export const mergeToIn = curry ((tgt, src) => {
    const ret = {}
    for (let i in tgt) ret[i] = tgt[i]
    for (let i in src) ret[i] = src[i]
    return ret
})

// --- both will float.
export const mergeFromIn = flip (mergeToIn)

export const mergeToInMut = curry ((tgt, src) => {
    const ret = tgt
    for (let i in src)
        ret[i] = src[i]
    return ret
})

export const mergeFromInMut = flip (mergeToInMut)

// Object.assign and {...} drop proto vals.

// ----- map indexed.
export const mapIndexed = addIndex (map)
export const mapAccumIndexed = addIndex (mapAccum)

// --- each obj indexed?
// --- each obj IN

// --- mapzip.

export const defaultToRF = (x, d) => ok (x)
    ? x : d ()

export const defaultTo = curry ((f, x) => ok (x)
    ? x : f ()
)

export const given = (xs, f) => f.apply (null, xs)
export const laat = given

export const invoke = f => f ()
export const invoke1 = curry ((val, f) => f (val))
export const invoke2 = curry ((val1, val2, f) => f (val1, val2))
export const invoke3 = curry ((val1, val2, val3, f) => f (val1, val2, val3))
export const invokeN = curry ((vs, f) => f.apply (null, vs))

export const callOn = curry ((o, f) => f.call (o))
export const callOn1 = curry ((o, val, f) => f.call (o, val))
export const callOn2 = curry ((o, val1, val2, f) => f.call (o, val1, val2))
export const callOn3 = curry ((o, val1, val2, val3, f) => f.call (o, val1, val2, val3))
export const callOnN = curry ((o, vs, f) => f.apply (o, vs))

export const call = callOn
export const call1 = callOn1
export const call2 = callOn2
export const call3 = callOn3
export const callN = callOnN

export const callUnder = curry ((f, o) => f.call (o))
export const callUnder1 = curry ((f, val, o) => f.call (o, val))
export const callUnder2 = curry ((f, val1, val2, o) => f.call (o, val1, val2))

const isFunction = callUnder ({}.toString)
    >> dot2 ('slice') (8, -1)
    >> equals ('Function')

export const givenStar = (xs, f) => {
    const xsMapper = (prevVals, v) => isFunction (v)
        ? v.apply (null, prevVals)
        : v

    const ys = xs
        // --- acc contains running output array, up to the previous item.
        | mapAccum ((acc, v) => xsMapper (acc, v)
            | (mapped => [[...acc, mapped], mapped])
        , [])
        | rProp (1)

    return f.apply (null, ys)
}

export const laatStar = givenStar

// --- flip first and second args: also works for functions curried with the a => b => ... notation.
export const flipC = curry ((f) => curry (
    (a, b, ...rest) => laat (
        [f (b) (a)],
        interimResult => rest.length === 0
            ? interimResult
            : rest | reduce((a, b) => a (b), interimResult)
    )
))

// ------ times, repeat

export const repeat = flip (rRepeat)
export const times = flip (rTimes)

export const compact = filter (Boolean)
export const compactOk = reject (isNil)

// ------ sprintf

export const sprintf1 = curry ((str, a) => sprintf (str, a))
export const sprintfN = curry ((str, xs) => sprintf.apply (null, [str, ...xs]))

export const noop = () => {}

// ------ try catch

export const tryCatch = (whatToTry, howToCatch = noop) => {
    try {
        return whatToTry ();
    } catch (e) {
        return howToCatch (e);
    }
}

// map (+ 2)
// map (.toUpperCase())
//
//
// factory stuff.
//
// unspread?
// const garble = (...args) => join (',') (args)
// const garble = applyXXX (join (','))

// --- turn positional args into an array with those values.
export const array = (...args) => args

const garble1 = (...args) => join (':') (args)
const garble2 = array >> join (':')

const garble = garble2

// the preposition refers to the identifier following.
//
// functions with an On ending are aliased to a version without it:
// call = callOn
// bind = bindOn
//
// functions with To and From endings have no aliases.
//

/*
if (this.startupCallback) {
    this.startupCallback();
}

this.startupCallback
| ifOk (callOn (this))

this.startupCallback
| ifOk (call (this))

ifOk__ (
    this.startupCallback,
    f => f.call (this),
)

ifOk__ (
    this.startupCallback,
    callOn (this),
)

ifOk__ (
    this.startupCallback,
    call (this),
)

ifOk__ (
    this.startupCallback,
    bind (this) >> call,
)

this.startupCallback
| ifOk (f => f.call (this))

'startupCallback'
| ifHasOn (this, call)

'startupCallback'
| ifBind (this, call)

invokeIfHas (this, 'startupCallback')
invoke1IfHas (this, 'startupCallback', 10)

ifBind (this, 'startupCallback', call)

*/

// inject?
// injectok
// injectwith
// mergeallin
// mergeallinwith
// okorerror
// existsorerror
// mapzip
// eachobjin
// eachobjindexed
// defaultto simple, func

export const zipAll = (...xss) => {
    const ret = []
    const l = xss[0].length
    for (let i = 0; i < l; i++) {
        const zip = xss | map (xs => xs[i])
        ret.push (zip)
    }
    return ret
}


// --- inject src into target, using only own vals.
const inject = curry ((src, target) => {
    src | eachObj ((v, k) => target[k] = v)
    return target
})

const shallowClone = obj => ({...obj})

// --- like inject, but only if src val is ok.
const injectOk = curry ((src, target) => {
    for (let i in src) ifOk (
        x => target[i] = x,
        src[i],
    )
    return target
})

// --- like R.merge but also use prototype vals.
export const mergeAllIn = xs => reduce (
    (target, mixin) => inject (mixin, target),
    {},
    xs,
)

const ifNot__ = (x, yes) => x ? yes (x) : void 8

export const mergeFish = (mixinsPre, proto, mixinsPost) => {
    const reduceMixin = reduce ((a, b) => b | mergeTo (a), {})
    const pre = mixinsPre | reduceMixin
    const post = mixinsPost | reduceMixin
    // new merge fun?
    pre | eachObj ((v, k) => ifNot__ (
        hasIn (k, proto),
        () => proto[k] = v,
    ))
    post | mergeToMut (proto)
    return proto
}

export const factory = (proto, mixinsPre = [], mixinsPost = []) => laat (
    [
//         mergeAllIn (
//             [...mixinsPre, shallowClone (proto), ...mixinsPost]
//         )
        mergeFish (mixinsPre, proto, mixinsPost)
    ],

    (protoExtended) => ({
        proto: protoExtended,
        create: instanceExtension => protoExtended
            | Object.create
            | injectOk (instanceExtension),
    })
)


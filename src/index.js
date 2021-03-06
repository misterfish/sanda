// ramda map works on objs: keys same, values altered.
// could make an object mapper which lets you return pairs.
//
// Object.assign and {...} drop proto vals.

// [1 2 3] -> [4 5 6] -> [1 2 3 [4 5 6]]
// [] -> a -> []

// the preposition refers to the identifier following.
//
// functions with an On ending are aliased to a version without it:
// call = callOn
// bind = bindOn
//
// functions with To and From endings have no aliases.

defineBinaryOperator ('|', (a, b) => b (a))
defineBinaryOperator ('>>', curry ((a, b) => compose (b, a)))
defineBinaryOperator ('<<', curry ((a, b) => compose (a, b)))

import {
    splitAt,
    isEmpty, tap, has, hasIn, flip, fromPairs, toPairs, toPairsIn, assoc, assocPath, head,
    last, tail, reduceRight, chain, identity, reduce, map, filter, reject, join,
    split, prop as rProp, path as rPath, defaultTo as rDefaultTo, curry, curryN,
    splitEvery,
    forEach as each, forEachObjIndexed as eachObj, complement, times as rTimes,
    range as rRange, isNil, addIndex, take, equals, mapAccum,
    repeat as rRepeat, concat as rConcat, append as rAppend, compose,
    merge as rMerge, mergeAll as rMergeAll,
    zip,
    gt as rGt, gte as rGte, lt as rLt, lte as rLte,
} from 'ramda'

import sprintf from 'sprintf'

import {
    bitwiseAnd, bitwiseOr, bitwiseXor, bitwiseNot,
    bitwiseLeft, bitwiseRight, bitwiseRightZeroFill,
} from './operator'

import {
    doe,
} from './monad'

export {
    bitwiseAnd, bitwiseOr, bitwiseXor, bitwiseNot,
    bitwiseLeft, bitwiseRight, bitwiseRightZeroFill,
    doe,
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

// @todo
export const dot4 = curry ((prop, val1, val2, val3, val4, o) => o[prop] (val1, val2, val3, val4))
export const dot5 = curry ((prop, val1, val2, val3, val4, val5, o) => o[prop] (val1, val2, val3, val4, val5))
export const dot6 = curry ((prop, val1, val2, val3, val4, val5, val6, o) => o[prop] (val1, val2, val3, val4, val5, val6))
export const dot4Mut = dot3

export const tapMut = tap
export const tapDotMut = tapDot
export const tapDot1Mut = tapDot1
export const tapDot2Mut = tapDot2
export const tapDot3Mut = tapDot3
export const tapDotNMut = tapDotN

// __ = not data-last, not curried

// ------ deps: noop, isFunction, ok

// ------ useless, same as ifYes.
// --- strict evaluation of cond.
// --- not anaphoric unless param is baked into yes or no.
// --- doesn't seem useful to pass anything into the yes and no functions.
// --- for anaphoric, see cond.
// export const ifCond = curry ((yes, no, cond) => cond ? yes () : no ())
// export const whenCond = curry ((yes, cond) => cond | ifCond (yes) (noop))
// export const ifCond__ = (cond, yes, no = noop) => cond | ifCond (yes) (no)

// @todo need something like
// when (isTTY, stdin => ...)
// stdin | whenPredicate (isTTY, stdin => ...)
//
// doesn't work
// stdin.setRawMode | whenFunction (pass1 (bool))
// stdin.bindTry ('setRawMode') | whenFunction (pass1 (bool))
// --- this is horrible.
// bool => tap (stdin => 'setRawMode' | bindTry (stdin) | whenFunction (pass1 (bool))),
// @todo whenBind? whenCan?

//@todo export const ifNotOk = curry ((f, x) => ok (x) ? void 8 : f (x))

export const ifOk = curry ((yes, no, x) => ok (x) ? yes (x) : no (x))
export const whenOk = curry ((yes, x) => x | ifOk (yes) (noop))
export const ifOk__ = (x, yes, no = noop) => x | ifOk (yes) (no)

// @todo
export const ifNotOk = curry ((yes, no, x) => isNil (x) ? yes (x) : no (x))
export const whenNotOk = curry ((yes, x) => x | ifNotOk (yes) (noop))
export const ifNotOk__ = (x, yes, no = noop) => x | ifNotOk (yes) (no)

export const ifTrue = curry ((yes, no, x) => x === true ? yes (x) : no (x))
export const whenTrue = curry ((yes, x) => x | ifTrue (yes) (noop))
export const ifTrue__ = (x, yes, no = noop) => x | ifTrue (yes) (no)

export const ifFalse = curry ((yes, no, x) => x === false ? yes (x) : no (x))
export const whenFalse = curry ((yes, x) => x | ifFalse (yes) (noop))
export const ifFalse__ = (x, yes, no = noop) => x | ifFalse (yes) (no)

export const ifYes = curry ((yes, no, x) => x ? yes (x) : no (x))
export const whenYes = curry ((yes, x) => x | ifYes (yes) (noop))
export const ifYes__ = (x, yes, no = noop) => x | ifYes (yes) (no)

export const ifNo = curry ((yes, no, x) => (! x) ? yes (x) : no (x))
export const whenNo = curry ((yes, x) => x | ifNo (yes) (noop))
export const ifNo__ = (x, yes, no = noop) => x | ifNo (yes) (no)

export const ifFunction = curry ((yes, no, x) => isFunction (x) ? yes (x) : no (x))
export const whenFunction = curry ((yes, x) => x | ifFunction (yes) (noop))
export const ifFunction__ = (x, yes, no = noop) => x | ifFunction (yes) (no)

export const ifLengthOne = curry ((yes, no, xs) => xs.length === 1 ? yes (xs) : no (xs))
export const whenLengthOne = curry ((yes, xs) => xs | ifLengthOne (yes) (noop))
export const ifLengthOne__ = (xs, yes, no = noop) => xs | ifLengthOne (yes) (no)

// @todo test
export const ifHas = curry ((yes, no, [o, k]) => o | has (k) ? yes (o[k], o, k) : no (o, k))
export const whenHas = curry ((yes, spec) => spec | ifHas (yes) (noop))
export const ifHas__ = (spec, yes, no = noop) => spec | ifHas (yes) (no)

// @todo test
export const ifHasIn = curry ((yes, no, [o, k]) => o | hasIn (k) ? yes (o[k], o, k) : no (o, k))
export const whenHasIn = curry ((yes, spec) => spec | ifHasIn (yes) (noop))
export const ifHasIn__ = (spec, yes, no = noop) => spec | ifHasIn (yes) (no)

// @todo test
export const ifBind = curry ((yes, no, [o, k]) => laat (
    [k | bindTry (o)],
    ifOk (yes, no),
))
export const whenBind = curry ((yes, spec) => spec | ifBind (yes) (noop))
export const ifBind__ = (spec, yes, no = noop) => spec | ifBind (yes) (no)

// --- last one always? undef if none?
// tests for truthINEss, so it acts like if().
// export const cond = curry ((blocks, target) => {
//     let result
//     for (const [test, exec] of blocks) {
//         if (!ok (test)) return exec (target)
//
//         const result = test (target)
// 		// @todo test.
//         // this order for symmetry with null case.
//         if (result) return exec (target, result)
//     }
// })

// need version with no target xx
export const cond = curry ((blocks, target) => {
    let result
    for (const [a, b] of blocks) {
        const [test, exec] = b | ifOk (
            () => [a, b],
            () => [null, a],
        )
        if (!ok (test)) return exec (target)

        const result = test (target)
		// @todo test.
        // this order for symmetry with null case.
        if (result) return exec (target, result)
    }
})


// ------ exceptions.

// @todo was buggy, changed
export const tryCatch = curry ((good, bad, f) => {
    let successVal
    try {
        successVal = f ()
    } catch (e) {
        return bad (e)
    }
    return good (successVal)
})

export const tryCatch__ = (whatToTry, howToCatch = noop) => {
    try {
        return whatToTry ();
    } catch (e) {
        return howToCatch (e);
    }
}

export const exception = (...args) => new Error (
    args | join (' ')
)
export const raise = (e) => { throw e }
export const die = (...args) => exception (...args) | raise
export const decorateException = curry ((prefix, e) =>
    e | assocMut ('message', joinOk (' ') ([prefix, e.message]))
)


// @ might be good if __ versions don't call the curried versions, because it messes up TCO.

// @todo
export const ifArray = curry ((yes, no, x) => isArray (x) ? yes (x) : no (x))

export const ifZero = curry ((yes, no, x) => x === 0 ? yes (x) : no (x))
export const whenZero = curry ((yes, x) => x | ifZero (yes) (noop))
export const ifZero__ = (x, yes, no = noop) => x | ifZero (yes) (no)
export const ifOne = curry ((yes, no, x) => x === 1 ? yes (x) : no (x))
export const whenOne = curry ((yes, x) => x | ifOne (yes) (noop))
export const ifOne__ = (x, yes, no = noop) => x | ifOne (yes) (no)

export const ifEmpty = curry ((yes, no, xs) => xs.length === 0 ? yes (xs) : no (xs))
export const whenEmpty = curry ((yes, xs) => xs | ifEmpty (yes) (noop))
export const ifEmpty__ = (xs, yes, no = noop) => xs | ifEmpty (yes) (no)

// --- tests for exact truth. better truthy? @todo
export const ifPredicate = curry ((f, yes, no, x) => f (x) === true ? yes (x) : no (x))
export const whenPredicate = curry ((f, yes, x) => x | ifPredicate (f) (yes) (noop))
export const ifPredicate__ = (f, x, yes, no = noop) => x | ifPredicate (f) (yes) (no)


// @todo
// alias ifEmpty -> isLengthOne
//
// @todo
// isLeft, isRight, isSome, isNone,

// ------ cascade

export const cascade = (val, ...fxs) =>
    fxs | reduce ((a, b) => b (a), val)

// ------ bind

// --- dies if o[prop] is not a function.
export const bind = curry ((o, prop) => o[prop].bind (o))

// --- returns undefined if o[prop] is not a function.
export const bindTry = curry ((o, prop) => o[prop]
    | whenFunction (() => bind (o, prop)))

// --- returns a function representing the 'result' of the bind: doesn't actually try to bind until
// that function is invoked.
export const bindLate = curry ((o, key) => (...args) => o[key] (...args))

// --------- data.

// ------ defaultTo.

// --- f is a *function*.
export const defaultTo = curry ((f, x) => ok (x) ? x : f ())
export const defaultTo__ = (x, f) => x | defaultTo (f)

// ------ assoc.

export const assocMut = curry ((prop, val, o) => (o[prop] = val, o))

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

const pushTo = appendToMut

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
// @todo: alias precatFrom
export const concatTo = rConcat

// @todo: alias precatTo
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
    for (let i in src) [src, i] | whenHas ((v, o, k) => ret[k] = v)
    return ret
})

export const mergeFromMut = flip (mergeToMut)

// --- discards non-own on src.
// --- does not discard non-own on tgt, b/c mut.
// --- uses collision function if key exists in the target, anywhere in target's prototype chain.
// --- 'with' refers to collision
// --- 'to' refers to tgt
// --- if a collision occurs in the target's prototype chain, the value will surface, regardless of
// whether src or tgt version is chosen.

export const mergeToWithMut = curry ((collision, tgt, src) => {
    const ret = tgt
    for (let i in src)
        [src, i] | whenHas ((v, o, k) => {
            [ret, i] | ifHasIn (
                (v, o, k) => ret[i] = collision (ret[i], src[i]),
                (o, k) => ret[i] = src[i],
            )
        })
    return ret
})

export const mergeFromWithMut = curry ((collision, src, tgt) =>
    mergeToWithMut (collision, tgt, src)
)

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

// --- like R.mergeAll but also use prototype vals.
// --- to and from not applicable, also not curried or meant to be used piped.
export const mergeAllIn = xs => xs | reduce (
    (target, source) => source | mergeToInMut (target),
    {},
)

// ------ map.

// --- user function f is expected to return pairs: [k, v]
//
// if target is an obj, it maps on key/value pairs of object.
// if target is an array [key, value, key, value], it maps on pairs (think %foo= @foo in perl)
//
// ordering: k, v.
// everywhere else: v, k.

export const mapPairs = curry ((f, obj) =>
    obj | ifArray (
        splitEvery (2)
        >> map (([k, v]) => f (k, v))
        >> fromPairs,

        toPairs
        >> map (([k, v]) => f (k, v))
        >> fromPairs,
    )
)

// --- doesn't take array, only obj.
export const mapPairsIn = curry ((f, obj) => obj
    | toPairsIn
    | map (([k, v]) => f (k, v))
    | fromPairs,
)

// --- ramda already gives us eachObj.

export const eachObjIn = curry ((f, obj) => {
    for (const k in obj) f (obj[k], k)
})

// [a -> b] -> [a] -> [b]
export const applyScalar = curry ((fs, xs) => xs
    | zip (fs)
    | map (([f, x]) => f (x))
)

export const passScalar = flip (applyScalar)

// @todo
export const scalarApply = applyScalar
export const scalarPass = passScalar

// --------- given/laat

export const given = (xs, f) => f.apply (null, xs)
export const laat = given

// note that f is optional: the last function in xs serves the same purpose, but it can be used for
// symmetry with laat.

export const givenStar = (...xs) => {
    const executeStep = prevVals => passN (prevVals)

    const ys = xs
        // --- acc contains running output array, up to the previous item.
        | mapAccum ((acc, v) => executeStep (acc) (v)
            | (stepVal => [[...acc, stepVal], stepVal])
        ) ([])
        | rProp (1)

    return ys | last
}

export const laatStar = givenStar

// --- 'call' always means pass a context.
// --- 'apply' always means 'apply this function to some params'
// --- 'pass' means 'pass these params to a function'
// --- 'invoke' means just call this function, no context or params.

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

export const invoke = f => f ()

export const pass1 = curry ((val, f) => f (val))
export const pass2 = curry ((val1, val2, f) => f (val1, val2))
export const pass3 = curry ((val1, val2, val3, f) => f (val1, val2, val3))
export const passN = curry ((vs, f) => f.apply (null, vs))

export const apply1 = curry ((f, val) => f (val))
export const apply2 = curry ((f, val1, val2) => f (val1, val2))
export const apply3 = curry ((f, val1, val2, val3) => f (val1, val2, val3))
export const applyN = curry ((f, vs) => f.apply (null, vs))

// --- flip first and second args of a curried function, even for functions with more than 2 args.
// --- also works for functions curried with the a => b => ... notation (unlike R.flip).
// --- does not work with non-curried functions.

export const flipC = f => curryN (2) (
    (a, b, ...rest) => laat (
        // --- if f had arity 2, f (b) (a) is the answer; otherwise it's a curried interim result,
        // since f itself was curried.
        [f (b) (a)],
        interimResult => rest | ifEmpty (
            () => interimResult,
            reduce ((a, b) => a (b)) (interimResult),
        )
    )
)

// ------ sprintf

export const sprintf1 = curry ((str, a) => sprintf (str, a))
export const sprintfN = curry ((str, xs) => sprintf.apply (null, [str, ...xs]))

export const noop = () => {}

// --- r's zip only takes two.
// @dep appendToMut
export const zipAll = (...xss) => {
    const ret = []
    const l = xss[0].length
    for (let i = 0; i < l; i++)
        xss | map (xs => xs [i]) | pushTo (ret)
    return ret
}

// --------- list.

// multiple versions with preps ??
export const repeat = flip (rRepeat)
export const times = flip (rTimes)

// @todo
// export const rangeBy = curry ((from, to, by, f) => {
//     for (let i = from; i <= to; i += by) f (i)
// })
// export const range = curry ((from, to, f) => rangeBy (from, to, 1, f))

// excl, so it's like ramda.
// they already provide range.
export const rangeBy = curry ((from, to, by) => {
    const coll = []
    for (let i = from; i < to; i += by) coll.push (i)
    return coll
})

export const compact = filter (Boolean)
export const compactOk = reject (isNil)

// --- turn positional args into an array with those values.
export const array = (...args) => args

export const joinOk = curry ((j, xs) => xs
    | compactOk
    | join (j)
)

// --------- new.

export const nieuw = x => new x
export const nieuw1 = curry ((x, val) => new x (val))
export const nieuw2 = curry ((x, val1, val2) => new x (val1, val2))
export const nieuw3 = curry ((x, val1, val2, val3) => new x (val1, val2, val3))
export const nieuwN = curry ((x, vs) => new x (...vs))

// --------- regex.
// @deps: dot1

// --- leaving out the 'flip' versions: assuming you generally want to pipe the target to the match
// functions.

const removeSpaces = dot2 ('replace') (/\s+/g) ('')

// --- input: regex.
export const xRegExp = re => new RegExp (
    re.source | removeSpaces,
    re.flags,
)

// --- input: string, [string].
export const xRegExpStr = (reStr, flags = '') => laat (
    [
        reStr | removeSpaces,
        flags,
    ],
    nieuw2 (RegExp)
)

export const match = curry ((re, target) => re.exec (target))

// --- input: regex.
export const xMatch = curry ((re, target) =>
    xRegExp (re) | dot1 ('exec', target)
)

// --- input: string.
export const xMatchStr = curry ((reStr, target) => target
    | xMatch (new RegExp (reStr)))

// --- input: string, string.
export const xMatchStrFlags = curry ((reStr, flags, target) => target
    | xMatch (new RegExp (reStr, flags)))

export const xReplace = curry ((re, repl, target) =>
    target.replace (xRegExp (re), repl)
)

export const xReplaceStr = curry ((reStr, repl, target) =>
    target.replace (xRegExpStr (reStr), repl)
)

export const xReplaceStrFlags = curry ((reStr, flags, repl, target) =>
    target.replace (xRegExpStr (reStr, flags), repl)
)

export const ifReplace = curry ((yes, no, re, repl, target) => {
    let success = 0
    const out = target.replace (re, () => {
        ++success
        return repl
    })
    return success | ifYes (() => yes (out, success), () => no (target))
})

export const ifXReplace = curry ((yes, no, re, repl, target) =>
    ifReplace (yes, no, re | xRegExp, repl, target)
)

export const ifXReplaceStr = curry ((yes, no, reStr, repl, target) =>
    ifReplace (yes, no, xRegExpStr (reStr), repl, target)
)

export const ifXReplaceStrFlags = curry ((yes, no, reStr, flags, repl, target) =>
    ifReplace (yes, no, xRegExpStr (reStr, flags), repl, target)
)

// --- returns a copy with prototype vals discarded.
export const discardPrototype = (o) => ({ ...o })

// --- returns a copy with prototype vals floated.
export const flattenPrototype = (o) => {
    const ret = {}
    for (const i in o) ret[i] = o[i]
    return ret
}

const arg0 = (...args) => args [0]
const arg1 = (...args) => args [1]

const mergeMixins = (mixinsPre, proto, mixinsPost) => {
    const reduceMixins = reduce ((a, b) => b | mergeTo (a)) ({})
    const pre = mixinsPre | reduceMixins
    const post = mixinsPost | reduceMixins
    const chooseTarget = arg0

    pre | mergeToWithMut (chooseTarget) (proto)
    post | mergeToMut (proto)

    return proto
}

// --- providing mixins will *alter* proto -- this is to avoid doing a clone or flattening the
// prototype chain.
// --- you can avoid this by passing Object.create (proto) instead of proto.
// --- probably if you are working with mixins you don't mind if the proto is altered, just saying.

// --- multiple instanceExtensions can be given: will be merged right-to-left using R.mergeAll,
// meaning prototypes will be discarded.

export const factory = (proto, mixinsPre = [], mixinsPost = []) => laat (
    [
        mergeMixins (mixinsPre, proto, mixinsPost),
    ],

    (protoExtended) => ({
        proto: protoExtended,
        create: (...instanceExtension) => protoExtended
            | Object.create
            | mergeFromInMut (instanceExtension | rMergeAll),
    })
)



// --- wants upper case, e.g. output of toString.
const isType = curry ((t, x) => x
    | callUnder ({}.toString)
    | dot2 ('slice') (8, -1)
    | equals (t)
)
const isArray = isType ('Array')
const isFunction = isType ('Function')

// --- map indexed: not sure about exporting these.
const mapIndexed = addIndex (map)
const mapAccumIndexed = addIndex (mapAccum)



// @test
export const laatDat = curry ((fs, f, x) => laat (
    fs | map (pass1 (x)),
    (...args) => f | passN ([x, ...args]),
))

// @test
export const laatStarDat = curry ((fs, x) =>
    fs | map (
        f => (...args) => f | passN ([x, ...args]),
    )
    | applyN (laatStar),
)

const listDat = curry ((fs, n) => fs | map (
    pass1 (n),
))

// --- or:
const listDat2 = (n => map (pass1 (n)) | flipC)
const listDat3 = flipC (n => map (pass1 (n)))
// --- >> is higher.
const listDat4 = pass1 >> map | curry | flipC
const listDat6 = pass1 >> map | flipC

const listDat5 = flipC (n => n | pass1 | map)

const _$ = {}

export const condElse = appendTo ([void 8])

export const condEquals = curry ((exec, testString) => [
//     testString | ifEquals (_$) (noop) (equals),
    testString | equals,
    exec,
])

export const condPredicate = curry ((exec, pred) => [
    pred,
    exec,
])

export const guard = condPredicate
export const otherwise = condElse

export const ifEquals = curry ((test, yes, no, x) => x === test ? yes (x) : no (x))
export const whenEquals = curry ((test, yes, x) => x | ifEquals (test) (yes) (noop))
export const ifEquals__ = (x, test, yes, no = noop) => x | ifEquals (test) (yes) (no)

export const gt = flip (rGt)
export const gte = flip (rGte)
export const lt = flip (rLt)
export const lte = flip (rLte)

// --- different from R.equals, which considers two different objects equal if their contents are
//     the same.
// --- different from R.identical, which has some different semantics involving e.g. 0 and -0.
// --- literally just wraps ===.
// rationale: must be able to confidently refactor working code which uses ===
export const eq = curry ((x, y) => x === y)
export const ne = curry ((x, y) => x !== y)

export const blush = x => _ => x

const ignore = n => f => (...args) => args | splitAt (n) | prop (1) | applyN (f)
const headTail = f => splitAt (1) >> f


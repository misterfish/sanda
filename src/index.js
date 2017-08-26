#!/usr/bin/env node

// ramda map works on objs: keys same, values altered.
// could make an object mapper which lets you return pairs.
//
// Object.assign and {...} drop proto vals.

// pushTo for not mut would be a confusing name.

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
defineBinaryOperator ('>>', (a, b) => (...args) => b (a (...args)))

import {
    isEmpty, tap, has, hasIn, flip, fromPairs, toPairs, assoc, assocPath, head,
    tail, reduceRight, chain, identity, reduce, map, filter, reject, join,
    split, prop as rProp, path as rPath, defaultTo as rDefaultTo, curry,
    splitEvery,
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

// __ = not data-last, not curried

// ------ deps: noop, isFunction, ok

// --- strict evaluation of cond.
// --- not anaphoric unless param is baked into yes or no.
// --- doesn't seem useful to pass anything into the yes and no functions.
export const ifCond = curry ((yes, no, cond) => cond ? yes () : no ())
export const whenCond = curry ((yes, cond) => cond | ifCond (yes) (noop))
export const ifCond__ = (cond, yes, no = noop) => cond | ifCond (yes) (no)

export const ifOk = curry ((yes, no, x) => ok (x) ? yes (x) : no (x))
export const whenOk = curry ((yes, x) => x | ifOk (yes) (noop))
export const ifOk__ = (x, yes, no = noop) => x | ifOk (yes) (no)

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

// @todo
const ifArray = curry ((yes, no, x) => isArray (x) ? yes (x) : no (x))
const ifZero = curry ((yes, no, x) => x === 0 ? yes (x) : no (x))
const whenZero = curry ((yes, x) => x | ifZero (yes) (noop))
const ifZero__ = (x, yes, no = noop) => x | ifZero (yes) (no)
const ifOne = curry ((yes, no, x) => x === 1 ? yes (x) : no (x))
const whenOne = curry ((yes, x) => x | ifOne (yes) (noop))
const ifOne__ = (x, yes, no = noop) => x | ifOne (yes) (no)

export const ifEmpty = curry ((yes, no, xs) => xs.length === 0 ? yes (xs) : no (xs))
export const whenEmpty = curry ((yes, xs) => xs | ifEmpty (yes) (noop))
export const ifEmpty__ = (xs, yes, no = noop) => xs | ifEmpty (yes) (no)

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

// ------ map.

// --- user function f is expected to return pairs: [k, v]
//
// if target is an obj, it maps on key/value pairs of object.
// if target is an array [key, value, key, value], it maps on pairs (think %foo= @foo in perl)

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

// --- map indexed: not sure about exporting these.
const mapIndexed = addIndex (map)
const mapAccumIndexed = addIndex (mapAccum)

// --- each obj indexed?
// --- each obj IN

// --- mapzip.

export const defaultTo__ = (x, d) => ok (x)
    ? x : d ()

export const defaultTo = curry ((f, x) => ok (x)
    ? x : f ()
)

export const given = (xs, f) => f.apply (null, xs)
export const laat = given

// xxx invoke needs two forms ugh

// log | invokeN ([1, 2, 3])
// log | invokeUsingN ([1, 2, 3])
// call them invoke using?
export const invoke = f => f ()
export const invoke1 = curry ((val, f) => f (val))
export const invoke2 = curry ((val1, val2, f) => f (val1, val2))
export const invoke3 = curry ((val1, val2, val3, f) => f (val1, val2, val3))
export const invokeN = curry ((vs, f) => f.apply (null, vs))

// ([1, 2, 3]) | invokeOn (log)

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

// an alternative is to skip f and just stick it as the last arg of xs; for now, keep it want
// symmetry

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
// outer curry not needed??
// and how can the inner curry work with rest params?
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
    for (let i in src) whenOk (
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

// list dependencies if a func uses other ones (for unit testing)

export const mergeFish = (mixinsPre, proto, mixinsPost) => {
    const reduceMixin = reduce ((a, b) => b | mergeTo (a), {})
    const pre = mixinsPre | reduceMixin
    const post = mixinsPost | reduceMixin

    // new merge fun?
//     pre | eachObj ((v, k) => ifNot__ (
//         hasIn (k, proto),
//         () => proto[k] = v,
//     ))

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

export const joinOk = curry ((j, xs) => xs
    | compactOk
    | join (j)
)

// check latest exception stuff from snippets and from wikiparse

export const exception = (...args) => new Error (
    args | join (' ')
)
export const raise = (e) => { throw e }
export const die = (...args) => exception (...args) | raise
export const decorateException = curry ((prefix, e) =>
    e | assocMut ('message', joinOk (' ') ([prefix, e.message]))
)

/*
 * invokeIfCanElse
 * if (canBind
function getSelection() {
        let txt = (window.getSelection)
        ? window.getSelection()
        : document.selection.createRange().text;

}

function getSelection() {
    const txt = 'getSelection' | window | ifBind (
        invoke,
        () => document.selection.createRange().text,
    )

    const gebonden = bind (window, 'getSelection')
    const txt = gebonden | ifOk (
        invoke,
        () => document.selection.createRange().text,
    )

    const txt = gebonden | invokeIfOkElse (
        () => document.selection.createRange().text,
    )

    const txt = [window, 'getSelection'] | ifBind (
        invoke,
        () => document.selection.createRange().text,
    )

    const txt =
        bind (window, 'getSelection')
        | ifOk (
            invoke,
            () => document.selection.createRange().text,
        )

// have to decide whether bind fails or returns undefined.
// probably fails. (see bind hard test)
//
// bind needs flip family as well.
// 'speak' | bind-to obj
// obj | bind-under 'speak'

    const txt =
        bind (window, 'getSelection')
        | ifOk (
            apply,
            () => document.selection.createRange().text,
        )

    
) ()
*/

/*
 *
 *
 * const y = x | defaultTo (() => 42)
 *
 */

/*
 * const a = [1, 2, 3]
 * a | applyTo (log) ... ?
 *
 */

/*
 * you could make the flattening proto stuff configurable
 *
 * if you want the opposite:
 *
 * // on:
 * o
 * | discardPrototype
 * | merge (p)
 *
 * // off:
 * o
 * | flattenPrototype
 * | merge (p)
 *
 *
 *
 *
 * xReplace should tell how many it replaced.
 * perhaps when global it should return an object.
 *
const xMatch = curry ((re, target) => re
    | rProp ('source')
    | replace (/\s+/g, '')
    | nieuw1 (RegExp)
    | dot1 ('exec', target)
)
export const nieuw1 = curry ((constructor, val) => new constructor (val))


nieuw
nieuw1


    parse: () => new Error (e)
        | tap (f => { f.msg = msg + ' ' + f.msg })
        | exception
snippet nieuw
const nieuw = x => new x
endsnippet

snippet nieuw1
const nieuw1 = curry ((x, val) => new x (val))
endsnippet

snippet nieuw2
const nieuw2 = curry ((x, val1, val2) => new x (val1, val2))
endsnippet

snippet nieuw3
const nieuw3 = curry ((x, val1, val2, val3) => new x (val1, val2, val3))
endsnippet


apply should keep the same meaning as in racket maybe, which it has anyway, so?
(apply f xs)
f.apply null xs


cond like in cond-> clojure macro.

x | cond ([ ... anaphoric functions ])





battery of conds:

const transform = (inFile) => {
    const c = slurp (inFile)
    const re1 = /^ \s* (<math (?:.|\s)+ <\/math>) \s+ true \s* $/
    const re2 = /^ \s* (<math [^>]* \/>) \s* true \s* $/
    let math
    const m1 = c | xMatch (re1)
    if (m1) {
        math = m1[1]
    } else {
        const m2 = c | xMatch (re2)
        if (m2) math = m2[1]
    }
    return math | ifElseOk (
        math => 'mml=' + math,
        () => warn ('no match', inFile, c, re1, re2),
    )
}


xMatch family also needs a from and to version.


export const xMatchStr = curry ((str, target) =>
    target | xMatch (new RegExp (str)))

export const ifElseOk = curry ((good, bad, x) =>
    ok (x) ? good (x) : bad ())


const ifElseTrue = curry ((good, bad, x) => {
    console.log ('x', x)
    return x === true ? good (x) : bad (x)
})

export const ifElseReplaceOk = curry ((good, bad, wat, met, target) => {
    let success
    const out = target.replace (wat, () => {
        success = true
        return met
    })
    return success | ifElseTrue (() => good (out), () => bad (target))
})

const str = 'ALLENS'
const re1 = ' x '
const re2 = ' l '

// --- target should be optional, will need other form.
// --- last one always? undef if none?
// tests for truthINEss
export const cond = curry ((blocks, target) => {
    let result
    for (const [test, exec] of blocks) {
        if (!ok (test)) return exec (target)

        const result = test (target)
        if (result) return exec (result)
    }
})

const out = str | cond ([
    [
        xMatchStr (re1),
        () => 'woot',
    ],
    [
        xMatchStr (re2),
        () => 'wut',
    ],
    [
        str => str === 'ALLEN',
        () => 'capital',
    ],
    [
        void 8,
        target => 'passthrough = ' + target,
    ],
])


(already fixed, see script, also cond implemented)
const transform = (inFile) => {
    const c = slurp (inFile)
    const re1 = /^ \s* (<math (?:.|\s)+ <\/math>) \s+ true \s* $/
    const re2 = /^ \s* (<math [^>]* \/>) \s* true \s* $/
    let math
    const m1 = c | xMatch (re1)
    if (m1) {
        math = m1[1]
    } else {
        const m2 = c | xMatch (re2)
        if (m2) math = m2[1]
    }
    return math | ifElseOk (
        math => 'mml=' + math,
        () => warn ('no match', inFile, c, re1, re2),
    )
}




in racket, one-armed if is when.



		isValidPgn:function(pgn) {
		    var pattern = new RegExp(/^[\d]{8,9}$/g); // 8-9 digits

		    if (!pattern.test(pgn)) {
				return false;
			}

			var total = 0;
			pgn.split('').forEach(function(elem, index, array) {
		    	if (index === array.length - 1) {
		    		total += -1 * parseInt(elem);
		    	} else {
		    		total += (array.length - index) * parseInt(elem);
		    	}
			});

		    return total % 11 === 0; // 'elfproef'
		},
		serializeForm:function(){
			var $disabledFields = $("*[disabled]",this.el);
			$disabledFields.removeAttr("disabled");

			var formData = $('form',this.$el).serializeObject();

			$disabledFields.attr("disabled","disabled");

			if(this.parseFormData){
				formData = this.parseFormData(formData);
			}
			return formData;
		},


*/

const isFunction = callUnder ({}.toString)
    >> dot2 ('slice') (8, -1)
    >> equals ('Function')

const isArray = callUnder ({}.toString)
    >> dot2 ('slice') (8, -1)
    >> equals ('Array')






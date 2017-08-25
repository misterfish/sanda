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

export const ifOk__ = (x, yes, no) => ifOk (yes, no, x)
export const ifOk = curry ((yes, x) => ok (x) ? yes (x) : void 8)

export const ifLengthOne = curry ((yes, no, xs) =>
    xs.length === 1 ? yes (xs) : no (xs)
)

export const ifEmpty = curry ((yes, no, xs) =>
    xs.length === 0 ? yes (xs) : no (xs)
)

export const ifLengthOne__ = (xs, yes, no) =>
    xs.length === 1 ? yes (xs) : no (xs)

export const ifEmpty__ = (xs, yes, no) =>
    xs.length === 0 ? yes (xs) : no (xs)

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

export const bind = curry ((o, prop) => o[prop].bind (o))

// @dep ifFunction
// @dep bind
/*
 * if (obj.speak) obj.speak()
 *
 * whenOk__ (
 *     bindTry (obj, 'speak'),
 *     invoke,
 * )
 *
 * whenOk__ (
 *     bindTry (obj, 'speak'),
 *     x => x ()
 * )
 *
 * bindTry (obj, 'speak') | whenOk (invoke)
 * whenBind (obj, 'speak') | invoke
 * invokeWhenBind (obj, 'speak')
 * whenBindInvoke (obj, 'speak')
 * invokeIfCan (obj, 'speak')
 * whenCanInvoke (obj, 'speak') // no
 *
 * bindTry (obj, 'speak') | invokeIfOk
 *
 * if (this.parseFormData) formData = this.parseFormData(formData);
 * first make immutable:
 *
 * if (this.parseFormData)
 *     newFormData = this.parseFormData(formData);
 *
 * const newFormData = invokeIfCan (this, 'parseFormData', formData, ... else ??)
 * const newFormData = bindTry (this, 'parseFormData') | ifOk (
 *     invoke,
 *     () => formData,
 * )
 *
 * const newFormData = [this, 'parseFormData'] | whenBind (invoke1 (formData))
 *
 * // nooo
 * const newFormData = bindTry (this, 'parseFormData') | ifOk (
 *     invoke,
 *     < formData
 * )
 *
 * const newFormData = bindTry (this, 'parseFormData') | invoke1IfOk (formData)
 *
 * if(this.model){
 *   this.model.set(this.serializeForm());
 * }
 *
 * bindTry (this, 'model') | whenOk (
 *   it => it.set (this.serializeForm())
 * )
 *
 * bindTry (this, 'model') | whenOk (
 *   dot1 ('set', (this.serializeForm()))
 * )
 *
 *
 */

export const bindTry = curry ((o, prop) => ifFunction (o[prop]) (bind (o, prop)))
export const bindLate = curry ((o, key) => (...args) => o[key] (...args))

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

export const ifFunction__ = (x, yes) => isFunction (x) ? yes (x) : void 8
export const ifFunction = curry ((yes, x) => ifFunction__ (x, yes))

const isFunction = callUnder ({}.toString)
    >> dot2 ('slice') (8, -1)
    >> equals ('Function')

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

// list dependencies if a func uses other ones (for unit testing)

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

export const joinOk = curry ((j, xs) => xs
    | compactOk
    | join (j)
)

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



do ([
 a <- thing-one
 b <- thing-two
 c <- (thing-three b)
])


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


const Id = (() => {
    const proto = {
        val: undefined,
        map (f) {
            return id (f (this.val))
        },
        // --- dunno how, needs xs
        apply (f) {
        },
        drop () {
            return this.val
        },
        chain (f) {
            return f (this.val)
        },
    }

    return {
        of (val) {
            return proto
            | Object.create
            | assocMut ('val') (val)
        },
    }
}) ()

const Just = (() => {
    const proto = {
        val: undefined,
        map (f) {
            return Just.of (f (this.val))
        },
        // --- dunno how, needs xs
        apply (f) {
        },
        drop () {
            return this.val
        },
        chain (f) {
            return f (this.val)
        },
    }

    return {
        of (val) {
            return proto
            | Object.create
            | assocMut ('val') (val)
        },
    }
}) ()

const Nothing = (() => {
    const proto = {
        map (f) {
            return Nothing.of ()
        },
        // --- dunno how, needs xs
        apply (f) {
        },
        drop () {
        },
        // doesn't call f. ??
        chain (f) {
        },
    }

    return {
        of (val) {
            return proto
            | Object.create
        },
    }
}) ()

const just = (...args) => Just.of (...args)
const nothing = (...args) => Nothing.of (...args)
const id = (...args) => Id.of (...args)

const doe = (...mainArgs) => {
    const fs = mainArgs | ifLengthOne (
        it => it [0],
        it => it,
    )

    const _doe = (fs, argsAcc) => fs.length === 1
        ? (...args) => {
            return head (fs).apply (null, [...argsAcc, ...args])
        }
        : (...args) => {
            const chainVal = head (fs).apply (null, [...argsAcc, ...args])
            const newArgsAcc = [...argsAcc, chainVal.drop ()]
            return chain (_doe (tail (fs), newArgsAcc) ) (
                chainVal
            )
        }

    const firstReturn = head (fs) ()
    return chain (_doe (tail (fs), [firstReturn.drop ()]) ) (firstReturn)
}

        // stretch the function out:
        //
        // (y) => id (x + y + 1)
        //
        // ->
        //
        // (x) => chain (recursive-stuff) (id (x + 1))
        //
        // and 'rewire it': before apply, prepend the accumulated vals to the args
        //
        // so
        //
        // (x, y) => x + y (given by user)
        //
        // needs to become
        //
        // (y) => x + y (needed by algorithm) (x is lexical)
        //
        // DWZ
        //
        // const f = head (fs)
        // (...args) => chain (recursive-stuff) (f.apply (null, [...argsAcc, ...args]))
        //
        // seems like the accumulator is left in a strange state after this.
        // try with 4!



/*
(struct id (val)
    #:transparent
    #:methods gen:functor
    [(define (map f x)
       (id (f (id-val x))))]
    #:methods gen:applicative
    [(define (pure _ x)
       (id x))
     (define (apply f xs)
       (base:apply (id-val f) (base:map id-val xs)))]
    #:methods gen:monad
    [(define (chain f x)
       (f (id-val x)))])

; --- (id 3)
(do
  [x <- (id 1)]
  [y <- (id 2)]
  (pure (+ x y)))

; --- equivalent to:

(chain
  (λ (x) (chain
            (λ (y) (pure (+ x y)))
            (id 2)))
  (id 1))

*/

// --- 'single' doesn't make that much sense (it will be wrapped).

// const singleMonadExpanded = id (1)
// const singleMonad = doe ([
//     () => id (1),
// ])
//
// console.log ('singleMonad')
// singleMonad | log
// console.log ('singleMonadExpanded')
// singleMonadExpanded | log

// remember that functions have a single return in js and always will (no 'array' return for me
// chump)

const doubleMonadExpanded = chain (
    (x) => x + 1
) (id (1)) // --- 2

doubleMonadExpanded | log

const doubleMonad = doe ([
    () => id (1),
    (x) => x + 1,
]) // --- 2.

doubleMonad | log

const tripleMonadExpanded = chain (
    (x) => chain (
        (y) => x + y // --- 35.
    ) (id (x + 25))
) (id (5))

tripleMonadExpanded | log

const tripleMonad = doe ([
    () => id (5),
    (x) => id (x + 25),
    (x, y) => x + y, // --- 35.
])

tripleMonad | log

// --- each step always takes one arg.

const quadrupleMonadExpanded = chain (
    (x) => chain (
        (y) => chain (
            (z) => x + y + z, // --- 55.
        ) (id (x * y)) // --- z = 39.
    ) (id (x + 10)) // --- y = 13.
) (id (3)) // --- x = 3.

quadrupleMonadExpanded | log

const quadrupleMonad = doe ([
    () => id (3),
    (x) => id (x + 10),
    (x, y) => id (x * y),

    // --- last one doesn't have to be a monad.
    // BUT you might want it to be, e.g. safeDivide, and then it's annoying to have to do another
    // step.
    // maybe doeStar or something like that?
    (x, y, z) => x + y + z,
])

quadrupleMonad | log

// isEmpty OR is nothing?
const safeFirst = xs => isEmpty (xs)
    ? nothing ()
    : just (head (xs))

const safeRest = xs => isEmpty (xs)
    ? nothing () // or empty list ??
    : just (tail (xs))

const safeDivide = a => b => b === 0
    ? nothing ()
    : just (a / b)

; [] | safeFirst | log
; [1, 2, 3] | safeFirst | log
; [1, 2, 3] | safeFirst | rProp ('val') | log

const divideFirstTwoMonadic = xs => doe (
    () => safeFirst (xs),
    (a) => safeRest (xs),
    (a, ys) => safeFirst (ys),
    (a, ys, b) => safeDivide (a) (b),
    (a, ys, b, x) => x,
)

divideFirstTwoMonadic ([1, 2, 3]) | log // --- 1.2
divideFirstTwoMonadic ([1, 0, 3]) | log // --- nothing
divideFirstTwoMonadic ([1]) | log // --- undefined (?)

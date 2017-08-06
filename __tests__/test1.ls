{
    assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, join, split, prop: rProp, path: rPath, defaultTo: rDefaultTo, curry, forEach: each, complement, isNil,
    repeat: rRepeat,
    times: r-times,
    reverse,
    tap,
    flip,
    zip,
} = require 'ramda'

# --- first test the dots, then after that we can use them in the tests
# (e.g. expect to equal / be)


array-ls = -> [.. for &]
array-js = (...args) -> args

array = array-js

log = console~log

test = (desc, the-test) --> global.it desc, the-test
xtest = (desc, the-test) --> global.xit desc, the-test

m1 = (prop, x, o) --> o[prop] x

zip-all = (...xss) ->
    l = xss.0.length
    for i from 0 to l - 1
        [xs[i] for xs in xss]

to-equal = m1 'toEqual'
to-be = m1 'toBe'
expect-to-equal = (expected, received) -->
    received |> expect |> to-equal expected
expect-to-be = (expected, received) -->
    received |> expect |> to-be expected

{
    ok,

    bitwise-and, bitwise-or, bitwise-xor, bitwise-not,
    bitwise-left, bitwise-right, bitwise-right-zero-fill,

    dot, dot1, dot2, dot3, dot-n,
    dot-mut, dot1-mut, dot2-mut, dot3-mut, dot-n-mut,
    tap-dot, tap-dot1, tap-dot2, tap-dot3, tap-dot-n,
    tap-mut,
    tap-dot-mut, tap-dot1-mut, tap-dot2-mut, tap-dot3-mut, tap-dot-n-mut,

    if-true,
    cond-true,

    if-true-RF,

    cascade,

    bind,

    append-to,
    append-to-mut,
    append-from,
    append-from-mut,

    prepend-from,
    prepend-from-mut,
    prepend-to,
    prepend-to-mut,

    concat-to,
    concat-to-mut,
    concat-from,
    concat-from-mut,

    merge-to,
    merge-from,

    merge-to-mut,
    merge-from-mut,

    merge-to-in,
    merge-from-in,

    merge-to-in-mut,
    merge-from-in-mut,

    flip-c,

    given, laat,
    given-star, laat-star,

    times,
    repeat,

    compact,
    compact-ok,

    sprintf1,
    sprintf-n,

    try-catch,

} = require '../lib/index'

describe 'ifTrue' ->
    do-test = (fn, { desc, input-val, ja-val, expect-num-calls, expect-ret, }) --> test desc, ->
        ja = jest.fn ()
            ..mock-return-value ja-val
        ret = input-val |> fn ja
        expect-num-calls |> (expect ja.mock.calls.length).to-equal
        expect-ret |> (expect ret).to-equal

        (expect ret).to-equal expect-ret

    tests = array do
        *   desc: 'true'
            input-val: true
            ja-val: 42
            expect-num-calls: 1
            expect-ret: 42
        *   desc: 'false'
            input-val: false
            ja-val: 42
            expect-num-calls: 0
            expect-ret: void
        *   desc: 'empty string'
            input-val: ''
            ja-val: 42
            expect-num-calls: 0
            expect-ret: void
        *   desc: 'undefined'
            input-val: void
            ja-val: 42
            expect-num-calls: 0
            expect-ret: void

    tests |> each do-test if-true

describe 'condTrue' ->
    do-test = (fn, { desc, input-val, ja-val, nee-val, expect-num-calls, expect-ret, }) --> test desc, ->
        ja = jest.fn ()
            ..mock-return-value ja-val
        nee = jest.fn ()
            ..mock-return-value nee-val
        ret = input-val |> fn ja, nee

        expect-num-calls.0 |> (expect ja.mock.calls.length).to-equal
        expect-num-calls.1 |> (expect nee.mock.calls.length).to-equal

        expect-ret |> (expect ret).to-equal

    tests = array do
        *   desc: 'true'
            input-val: true
            ja-val: 42
            nee-val: 43
            expect-num-calls: [1 0]
            expect-ret: 42
        *   desc: 'false'
            input-val: false
            ja-val: 42
            nee-val: 43
            expect-num-calls: [0 1]
            expect-ret: 43
        *   desc: 'empty string'
            input-val: ''
            ja-val: 42
            nee-val: 43
            expect-num-calls: [0 1]
            expect-ret: 43

    tests |> each do-test cond-true

describe 'ifTrueRF' ->
    fn = if-true-RF
    the-test = (vals) ->
        { input-val, do-nee, ja-val, nee-val, expect-num-calls, expect-ret, } = vals
        ja = jest.fn ()
            ..mock-return-value ja-val
        nee = jest.fn ()
            ..mock-return-value nee-val
        ret = if do-nee then
            fn input-val, ja, nee
        else fn input-val, ja

        expect-num-calls.0 |> (expect ja.mock.calls.length).to-equal
        expect-num-calls.1 |> (expect nee.mock.calls.length).to-equal

        expect-ret |> (expect ret).to-equal

    tests = array do
        *   desc: 'true'
            input-val: true
            do-nee: true
            ja-val: 42
            nee-val: 43
            expect-num-calls: [1 0]
            expect-ret: 42
        *   desc: 'true, no else'
            input-val: true
            do-nee: false
            ja-val: 42
            expect-num-calls: [1 0]
            expect-ret: 42
        *   desc: 'false'
            input-val: false
            do-nee: true
            ja-val: 42
            nee-val: 43
            expect-num-calls: [0 1]
            expect-ret: 43
        *   desc: 'false, no else'
            input-val: false
            do-nee: false
            ja-val: 42
            expect-num-calls: [0 0]
            expect-ret: void

    do-test = (vals) -> test do
        vals.desc
        -> the-test vals

    tests |> each do-test

describe 'cascade' ->
    test 1 ->
        odd = (x) -> x % 2 != 0
        ret = cascade do
            [1 to 5]
            filter (odd)
            map (* 2)
        (expect ret).to-equal [2 6 10]

describe 'bind' ->
    test 1 ->
        obj =
            name: 'dog'
            speak: -> 'my name is ' + @name
        bad-speak = obj.speak
        (expect bad-speak()).not.to-equal 'my name is dog'

        good-speak = bind obj, 'speak'
        (expect good-speak()).to-equal 'my name is dog'

# --- vals always get loaded from src into target (direction of pipe is
# changed).

run = (args) ->
    { fn, src, tgt, dir, } = args
    if dir == 'to' then src |> fn tgt
    else                tgt |> fn src

test-mut = (args) ->
    { res, mut, tgt, } = args
    if mut then (expect res).to-be tgt
    else        (expect res).not.to-be tgt

describe 'appendTo' ->
    fn = append-to
    dir = 'to'
    mut = false
    test 1 ->
        tgt = [1 2 3]
        src = [4 5 6]
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }
        (expect res).to-equal [1 2 3 [4 5 6]]
    test 2 ->
        tgt = [1 2 3]
        src = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }
        (expect res).to-equal [1 to 4]
    test 'eg' ->
        res = 3
        |> append-to [4]
        (expect res).to-equal [4 3]

describe 'appendToMut' ->
    fn = append-to-mut
    dir = 'to'
    mut = true
    test 'array to array' ->
        tgt = [1 2 3]
        src = [4 5 6]
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }
        (expect res).to-equal [1 2 3 [4 5 6]]
    test 'elem to array' ->
        tgt = [1 2 3]
        src = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }
        (expect res).to-equal [1 to 4]
    test 'eg' ->
        res = 3
        |> append-to-mut [4]
        (expect res).to-equal [4 3]

describe 'appendFrom' ->
    fn = append-from
    dir = 'from'
    mut = false
    test 1 ->
        tgt = [1 2 3]
        src = [4 5 6]
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }
        (expect res).to-equal [1 2 3 [4 5 6]]
    test 2 ->
        tgt = [1 2 3]
        src = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }
        (expect res).to-equal [1 to 4]
    test 'eg' ->
        res = [3]
        |> append-from 4
        (expect res).to-equal [3 4]

describe 'appendFromMut' ->
    fn = append-from-mut
    dir = 'from'
    mut = true
    test 'array -> array' ->
        tgt = [1 2 3]
        src = [4 5 6]
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }
        (expect res).to-equal [1 2 3 [4 5 6]]
    test 'elem -> array' ->
        tgt = [1 2 3]
        src = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }
        (expect res).to-equal [1 to 4]
    test 'eg' ->
        res = [4]
        |> append-from-mut 3
        (expect res).to-equal [4 3]

describe 'prependTo' ->
    fn = prepend-to
    dir = 'to'
    mut = false
    test 'array -> array' ->
        tgt = [1 2 3]
        src = [4 5 6]
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }
        (expect res).to-equal [[4 5 6] 1 2 3]
    test 'number -> array' ->
        tgt = [1 2 3]
        src = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }
        (expect res).to-equal [4 1 2 3]
    test 'eg' ->
        res = 3
        |> prepend-to [4]
        (expect res).to-equal [3 4]

describe 'prependFrom' ->
    fn = prepend-from
    dir = 'from'
    mut = false
    test 'array -> array' ->
        tgt = [1 2 3]
        src = [4 5 6]
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }
        (expect res).to-equal [[4 5 6] 1 2 3]
    test 'element -> array' ->
        tgt = [1 2 3]
        src = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }
        (expect res).to-equal [4 1 2 3]
    test 'eg' ->
        res = [4]
        |> prepend-from 3
        (expect res).to-equal [3 4]

describe 'prependFromMut' ->
    fn = prepend-from-mut
    dir = 'from'
    mut = true
    test 'array to array' ->
        tgt = [1 2 3]
        src = [4 5 6]
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }
        (expect res).to-equal [[4 5 6] 1 2 3]
    test 'elem to array' ->
        tgt = [1 2 3]
        src = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }
        (expect res).to-equal [4 1 2 3]
    test 'eg' ->
        res = [3]
        |> prepend-from-mut 4
        (expect res).to-equal [4 3]

describe 'prependToMut' ->
    fn = prepend-to-mut
    dir = 'to'
    mut = true
    test 'array to array' ->
        tgt = [1 2 3]
        src = [4 5 6]
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }
        (expect res).to-equal [[4 5 6] 1 2 3]
    test 'elem to array' ->
        tgt = [1 2 3]
        src = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }
        (expect res).to-equal [4 1 2 3]
    test 'eg' ->
        res = 4
        |> prepend-to-mut [3]
        (expect res).to-equal [4 3]

describe 'concatTo' ->
    fn = concat-to
    dir = 'to'
    mut = false
    test 'array -> array' ->
        tgt = [1 2 3]
        src = [4 5 6]
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }
        (expect res).to-equal [1 to 6]
    test 'string -> string' ->
        tgt = "don't give me no "
        src = 'jibber jabber'
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }
        (expect res).to-equal tgt + src
    test 'unequal types => throw' ->
        tgt = [1 2 3]
        src = 4
        (expect -> src |> concat-to tgt).to-throw()

describe 'concatToMut' ->
    fn = concat-to-mut
    dir = 'to'
    mut = true
    test 1 ->
        tgt = [1 2 3]
        src = [4 5 6]
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }
        (expect res).to-equal [1 to 6]
    test 'strings -> throw' ->
        tgt = "don't give me no "
        src = 'jibber jabber'
        (expect -> src |> concat-to-mut tgt).to-throw()

describe 'concatFrom' ->
    fn = concat-from
    dir = 'from'
    mut = false
    test 'array -> array' ->
        tgt = [1 2 3]
        src = [4 5 6]
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }
        (expect res).to-equal [1 to 6]
    test 'elem -> array' ->
        tgt = [1 2 3]
        src = 4
        expect(-> src |> concat-from tgt).to-throw()

describe 'concatFromMut' ->
    fn = concat-from-mut
    dir = 'from'
    mut = true
    test 1 ->
        tgt = [1 2 3]
        src = [4 5 6]
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }
        (expect res).to-equal [1 to 6]

describe 'mergeTo' ->
    fn = merge-to
    dir = 'to'
    mut = false
    test 1 ->
        tgt = a: 1 b: 2
        src =      b: 3 c: 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }
        (expect res).to-equal a: 1 b: 3 c: 4
    test 'discards non-own vals 1' ->
        tgt = Object.create hidden: 42
            ..a = 1
            ..b = 2
        src = Object.create hidden: 43
            ..b = 3
            ..c = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }

        (expect res).to-equal a: 1 b: 3 c: 4
        (expect res.hidden).to-equal void
    test 'discards non-own vals 2' ->
        tgt = Object.create hidden: 42
            ..a = 1
            ..b = 2
        src = Object.create {}
            ..b = 3
            ..c = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }

        (expect res).to-equal a: 1 b: 3 c: 4
        (expect res.hidden).to-equal void
    test 'discards non-own vals 3' ->
        tgt = Object.create {}
            ..a = 1
            ..b = 2
        src = Object.create hidden: 43
            ..b = 3
            ..c = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }

        (expect res).to-equal a: 1 b: 3 c: 4
        (expect res.hidden).to-equal void

describe 'mergeFrom' ->
    fn = merge-from
    dir = 'from'
    mut = false
    test 1 ->
        tgt = a: 1 b: 2
        src =      b: 3 c: 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }
        (expect res).to-equal a: 1 b: 3 c: 4
    test 'discards non-own vals 1' ->
        tgt = Object.create hidden: 42
            ..a = 1
            ..b = 2
        src = Object.create hidden: 43
            ..b = 3
            ..c = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }

        (expect res).to-equal a: 1 b: 3 c: 4
        (expect res.hidden).to-equal void
    test 'discards non-own vals 2' ->
        tgt = Object.create hidden: 42
            ..a = 1
            ..b = 2
        src = Object.create {}
            ..b = 3
            ..c = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }

        (expect res).to-equal a: 1 b: 3 c: 4
        (expect res.hidden).to-equal void
    test 'discards non-own vals 3' ->
        tgt = Object.create {}
            ..a = 1
            ..b = 2
        src = Object.create hidden: 43
            ..b = 3
            ..c = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }

        (expect res).to-equal a: 1 b: 3 c: 4
        (expect res.hidden).to-equal void

describe 'mergeToMut' ->
    fn = merge-to-mut
    dir = 'to'
    mut = true
    test 1 ->
        tgt = a: 1 b: 2
        src =      b: 3 c: 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }
        (expect res).to-equal a: 1 b: 3 c: 4
    test 'discards non-own on src' ->
        tgt = Object.create {}
            ..a = 1
            ..b = 2
        src = Object.create hidden: 43
            ..b = 3
            ..c = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }
        (expect res).to-equal a: 1 b: 3 c: 4
        (expect res.hidden).to-equal void
    test 'discards non-own on src, retains on tgt' ->
        tgt = Object.create hidden: 42
            ..a = 1
            ..b = 2
        src = Object.create {}
            ..b = 3
            ..c = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }
        (expect res).to-equal a: 1 b: 3 c: 4
        (expect res.hidden).to-equal 42
    test 'discards non-own vals 3' ->
        tgt = Object.create hidden: 42
            ..a = 1
            ..b = 2
        src = Object.create hidden: 43
            ..b = 3
            ..c = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }
        (expect res).to-equal a: 1 b: 3 c: 4

describe 'mergeFromMut' ->
    fn = merge-from-mut
    dir = 'from'
    mut = true
    test 1 ->
        tgt = a: 1 b: 2
        src =      b: 3 c: 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }
        (expect res).to-equal a: 1 b: 3 c: 4
    test 'discards non-own on src' ->
        tgt = Object.create {}
            ..a = 1
            ..b = 2
        src = Object.create hidden: 43
            ..b = 3
            ..c = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }
        (expect res).to-equal a: 1 b: 3 c: 4
        (expect res.hidden).to-equal void
    test 'discards non-own on src, retains on tgt' ->
        tgt = Object.create hidden: 42
            ..a = 1
            ..b = 2
        src = Object.create {}
            ..b = 3
            ..c = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }
        (expect res).to-equal a: 1 b: 3 c: 4
        (expect res.hidden).to-equal 42
    test 'discards non-own vals 3' ->
        tgt = Object.create hidden: 42
            ..a = 1
            ..b = 2
        src = Object.create hidden: 43
            ..b = 3
            ..c = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }
        (expect res).to-equal a: 1 b: 3 c: 4

describe 'mergeToIn' ->
    fn = merge-to-in
    dir = 'to'
    mut = false
    test 1 ->
        tgt = Object.create hidden: 42
            ..a = 1
            ..b = 2
        src = Object.create {}
            ..b = 3
            ..c = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }

        (expect res).to-equal a: 1 b: 3 c: 4 hidden: 42
    test 2 ->
        tgt = Object.create {}
            ..a = 1
            ..b = 2
        src = Object.create hidden: 43
            ..b = 3
            ..c = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }

        (expect res).to-equal a: 1 b: 3 c: 4 hidden: 43
    test 3 ->
        tgt = Object.create hidden: 42
            ..a = 1
            ..b = 2
        src = Object.create hidden: 43
            ..b = 3
            ..c = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }

        (expect res).to-equal a: 1 b: 3 c: 4 hidden: 43

describe 'mergeFromIn' ->
    fn = merge-from-in
    dir = 'from'
    mut = false
    test 1 ->
        tgt = Object.create hidden: 42
            ..a = 1
            ..b = 2
        src = Object.create {}
            ..b = 3
            ..c = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }

        (expect res).to-equal a: 1 b: 3 c: 4 hidden: 42
    test 2 ->
        tgt = Object.create {}
            ..a = 1
            ..b = 2
        src = Object.create hidden: 43
            ..b = 3
            ..c = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }

        (expect res).to-equal a: 1 b: 3 c: 4 hidden: 43
    test 3 ->
        tgt = Object.create hidden: 42
            ..a = 1
            ..b = 2
        src = Object.create hidden: 43
            ..b = 3
            ..c = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }

        (expect res).to-equal a: 1 b: 3 c: 4 hidden: 43

describe 'mergeToInMut' ->
    fn = merge-to-in-mut
    dir = 'to'
    mut = true
    test 1 ->
        tgt = Object.create hidden: 42
            ..a = 1
            ..b = 2
        src = Object.create {}
            ..b = 3
            ..c = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }

        (expect res).to-equal a: 1 b: 3 c: 4
        (expect res.hidden).to-equal 42
    test 2 ->
        tgt = Object.create {}
            ..a = 1
            ..b = 2
        src = Object.create hidden: 43
            ..b = 3
            ..c = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }

        (expect res).to-equal a: 1 b: 3 c: 4 hidden: 43
    test 3 ->
        tgt = Object.create hidden: 42
            ..a = 1
            ..b = 2
        src = Object.create hidden: 43
            ..b = 3
            ..c = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }

        (expect res).to-equal a: 1 b: 3 c: 4 hidden: 43

describe 'mergeFromInMut' ->
    fn = merge-from-in-mut
    dir = 'from'
    mut = true
    test 1 ->
        tgt = Object.create hidden: 42
            ..a = 1
            ..b = 2
        src = Object.create {}
            ..b = 3
            ..c = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }

        (expect res).to-equal a: 1 b: 3 c: 4
        (expect res.hidden).to-equal 42
    test 2 ->
        tgt = Object.create {}
            ..a = 1
            ..b = 2
        src = Object.create hidden: 43
            ..b = 3
            ..c = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }

        (expect res).to-equal a: 1 b: 3 c: 4 hidden: 43
    test 3 ->
        tgt = Object.create hidden: 42
            ..a = 1
            ..b = 2
        src = Object.create hidden: 43
            ..b = 3
            ..c = 4
        res = run do
            { fn, src, tgt, dir, }
        test-mut do
            { res, mut, tgt, }

        (expect res).to-equal a: 1 b: 3 c: 4 hidden: 43

describe 'flipC' ->
    fn = flip-c
    describe 'target created with "haskell" curry notation' ->
        divide = (a) -> (b) -> a / b
        divide-and-add-three-args = (a) -> (b) -> (c) -> a / b + c
        divide-and-add-four-args = (a) -> (b) -> (c) -> (d) -> a / b + c + d

        divide-flipped = flip-c divide
        divide-and-add-three-args-flipped = flip-c divide-and-add-three-args
        divide-and-add-four-args-flipped = flip-c divide-and-add-four-args

        test 'init' ->
            (expect (divide 10) 5).to-equal 2
            (expect ((divide-and-add-three-args 10) 5) 1).to-equal 3
            (expect (((divide-and-add-four-args 10) 5) 1) 2).to-equal 5

        describe '2 args' ->
            test 1 ->
                (expect divide-flipped 10 5).to-equal 0.5
            test 'result is curried' ->
                (expect (divide-flipped 10) 5).to-equal 0.5
        describe '2 + 1 args' ->
            test 1 ->
                (expect divide-and-add-three-args-flipped 10 5 1).to-equal 1.5
            test 'result is curried' ->
                (expect ((divide-and-add-three-args-flipped 10) 5) 1).to-equal 1.5
        describe '2 + > 1 args' ->
            test 1 ->
                (expect divide-and-add-four-args-flipped 10 5 1 2).to-equal 3.5
            test 'result is curried' ->
                (expect (((divide-and-add-four-args-flipped 10) 5) 1) 2).to-equal 3.5
    describe 'target created with LS curry function' ->
        divide = (a, b) --> a / b
        divide-and-add-three-args = (a, b, c) --> a / b + c
        divide-and-add-four-args = (a, b, c, d) --> a / b + c + d

        divide-flipped = flip-c divide
        divide-and-add-three-args-flipped = flip-c divide-and-add-three-args
        divide-and-add-four-args-flipped = flip-c divide-and-add-four-args

        test 'init' ->
            (expect (divide 10) 5).to-equal 2
            (expect ((divide-and-add-three-args 10) 5) 1).to-equal 3
            (expect (((divide-and-add-four-args 10) 5) 1) 2).to-equal 5

        describe '2 args' ->
            test 1 ->
                (expect divide-flipped 10 5).to-equal 0.5
            test 'result is curried' ->
                (expect (divide-flipped 10) 5).to-equal 0.5
        describe '2 + 1 args' ->
            test 1 ->
                (expect divide-and-add-three-args-flipped 10 5 1).to-equal 1.5
            test 'result is curried' ->
                (expect ((divide-and-add-three-args-flipped 10) 5) 1).to-equal 1.5
        describe '2 + > 1 args' ->
            test 1 ->
                (expect divide-and-add-four-args-flipped 10 5 1 2).to-equal 3.5
            test 'result is curried' ->
                (expect (((divide-and-add-four-args-flipped 10) 5) 1) 2).to-equal 3.5
    describe 'target created with ramda curry function' ->
        divide = curry (a, b) -> a / b
        divide-and-add-three-args = curry (a, b, c) -> a / b + c
        divide-and-add-four-args = curry (a, b, c, d) -> a / b + c + d

        divide-flipped = flip-c divide
        divide-and-add-three-args-flipped = flip-c divide-and-add-three-args
        divide-and-add-four-args-flipped = flip-c divide-and-add-four-args

        test 'init' ->
            (expect (divide 10) 5).to-equal 2
            (expect ((divide-and-add-three-args 10) 5) 1).to-equal 3
            (expect (((divide-and-add-four-args 10) 5) 1) 2).to-equal 5

        describe '2 args' ->
            test 1 ->
                (expect divide-flipped 10 5).to-equal 0.5
            test 'result is curried' ->
                (expect (divide-flipped 10) 5).to-equal 0.5
        describe '2 + 1 args' ->
            test 1 ->
                (expect divide-and-add-three-args-flipped 10 5 1).to-equal 1.5
            test 'result is curried' ->
                (expect ((divide-and-add-three-args-flipped 10) 5) 1).to-equal 1.5
        describe '2 + > 1 args' ->
            test 1 ->
                (expect divide-and-add-four-args-flipped 10 5 1 2).to-equal 3.5
            test 'result is curried' ->
                (expect (((divide-and-add-four-args-flipped 10) 5) 1) 2).to-equal 3.5

describe 'laat' ->
    test 'alias given' ->
        (expect given).to-be laat
    test 1 ->
        laat [10 12 19] (ten, twelve, nineteen) ->
            (expect ten + twelve + nineteen).to-equal 41

describe 'laatStar' ->
    test 'alias givenStar' ->
        (expect given-star).to-be laat-star
    test 'superset of laat' ->
        laat-star do
            [ 10 12 19 ]
            (ten, twelve, nineteen) ->
                (expect ten + twelve + nineteen).to-equal 41
    test 'recursive references' ->
        laat-star do
            [
                10
                (ten) -> ten + 2
                (ten, twelve) -> twelve + 7
                (ten, twelve, nineteen) -> 2
            ]
            (ten, twelve, nineteen, two) ->
                (expect ten + twelve + nineteen + two)
                |> to-equal 43
    test 'single function' ->
        laat-star do
            [
                -> 11
            ]
            (eleven) ->
                (expect eleven).to-equal 11
    test 'mixed references' ->
        laat-star do
            [
                10
                (ten) -> ten + 2
                19
                (ten, twelve, nineteen) -> 2
                5
            ]
            (ten, twelve, nineteen, two, five) ->
                (expect ten + twelve + nineteen + two + five)
                |> to-equal 48
    test 'fibonacci' ->
        fibonacci = (n) ->
            sum-last-two = (xs) -> xs[*-1] + xs[*-2]
            entry = (...prev) ->
                m = prev.length
                switch
                | m == 0 => 1
                | m == 1 => 1
                | otherwise => sum-last-two prev
            refs = times n + 1, -> entry
            laat-star refs, array

        (expect fibonacci 0).to-equal [1]
        (expect fibonacci 1).to-equal [1 1]
        (expect fibonacci 2).to-equal [1 1 2]
        (expect fibonacci 8).to-equal [1 1 2 3 5 8 13 21 34]
        (expect fibonacci 9).to-equal [1 1 2 3 5 8 13 21 34 55]

describe 'repeat' ->
    test 1 ->
        ('thing' |> repeat 5 |> expect)
        |> to-equal ['thing'] * 5

describe 'times' ->
    thing = (i) -> i
    test 1 ->
        (thing |> times 5 |> expect)
        |> to-equal [0 to 4]

describe 'compact*' ->
    mixed = [1 '' 0 '0' void false true 2]
    falsey = [false void null '' 0 NaN]
    truthy = [true '0' [] {} -1 Infinity]
    describe 'compact' ->
        test 1 ->
            mixed
            |> compact
            |> expect
            |> to-equal [
                1 '0' true 2
            ]
        test 'all falsey' ->
            falsey
            |> compact
            |> expect
            |> to-equal [
            ]
        test 'all truthy' ->
            truthy
            |> compact
            |> expect
            |> to-equal truthy
    describe 'compactOk' ->
        test 1 ->
            mixed
            |> compact-ok
            |> expect
            |> to-equal [
                1 '' 0 '0' false true 2
            ]
        test 'all falsey' ->
            falsey
            |> compact-ok
            |> expect
            |> to-equal [
                false '' 0 NaN
            ]
        test 'all truthy' ->
            truthy
            |> compact-ok
            |> expect
            |> to-equal truthy

describe 'sprintf*' ->
    describe 'sprintf1' ->
        test 1 ->
            'dog'
            |> sprintf1 'my name is %s'
            |> expect
            |> to-equal 'my name is dog'
        test 2 ->
            10/3
            |> sprintf1 'my name is %0.2f'
            |> expect
            |> to-equal 'my name is 3.33'
    describe 'sprintfn' ->
        test 1 ->
            ['is' 'dog']
            |> sprintf-n 'my name %s not %s'
            |> expect
            |> to-equal 'my name is not dog'
        test 2 ->
            ['is' 10/3]
            |> sprintf-n 'my name %s %0.2f'
            |> expect
            |> to-equal 'my name is 3.33'

describe 'try/catch' ->
    danger = -> throw new Error
    safe = -> 99
    test 'should fail' ->
        catcher = jest.fn()
            ..mock-return-value 10
        try-catch danger, catcher
        |> expect
        |> to-equal 10
    test 'should succeed' ->
        catcher = jest.fn()
            ..mock-return-value 10
        try-catch safe, catcher
        |> expect
        |> to-equal 99

describe 'dot*' ->
    obj =
        name: 'dog'
        bark: -> 'rough'
        speak: (word) -> "my #word is " + @name
        jump: (where, how-high) -> "jumping #how-high #where"
        garble: (...all) -> all |> join '!'

    describe 'aliases' ->
        normal = [dot, dot1, dot2, dot3, dot-n]
        mut = [dot-mut, dot1-mut, dot2-mut, dot3-mut, dot-n-mut]
        names = ['dot-mut', 'dot1-mut', 'dot2-mut', 'dot3-mut', 'dot-n-mut']

        zip-all normal, mut, names
        |> each ([alias-l, alias-r, name]) ->
            test name, ->
                (expect alias-l).to-be alias-r

    describe 'dot' ->
        trim = dot 'trim'
        bark = dot 'bark'
        test 'string' ->
            ' dog '
            |> trim
            |> expect-to-equal 'dog'
        test 'user obj' ->
            obj
            |> bark
            |> expect-to-equal 'rough'
        test 'array' ->
            [1 to 4]
            |> dot-mut 'shift'
            |> expect-to-equal 1
    describe 'dot1' ->
        speak = dot1 'speak'
        test 'string' ->
            'dog'
            |> dot1 'concat' 's'
            |> expect-to-equal 'dogs'
        test 'user-obj' ->
            obj
            |> speak 'name'
            |> expect-to-equal 'my name is dog'
    describe 'dot2' ->
        jump = dot2 'jump'
        test 'string' ->
            'dog'
            |> dot2 'concat' 'gie' 's'
            |> expect-to-equal 'doggies'
        test 'user-obj' ->
            obj
            |> jump 'up' '3m'
            |> expect-to-equal 'jumping 3m up'
    describe 'dot3' ->
        garble = dot3 'garble'
        test 'string' ->
            'dog'
            |> dot3 'concat' 'g' 'ie' 's'
            |> expect-to-equal 'doggies'
        test 'user-obj' ->
            obj
            |> garble 'a' 'b' 'c'
            |> expect-to-equal 'a!b!c'
    describe 'dotN' ->
        garble = dotN 'garble'
        test 'string' ->
            'dog'
            |> dotN 'concat' ['g' 'ie' 's']
            |> expect-to-equal 'doggies'
        test 'user-obj' ->
            obj
            |> garble ['a' 'b' 'c' 'd']
            |> expect-to-equal 'a!b!c!d'
    describe 'dots combine' ->
        test 1 ->
            ' dog '
            |> dot 'trim'
            |> dot1 'concat' 'g'
            |> dot2 'slice' 1 3
            |> dot3 'concat' 'g' 'i' 'es'
            |> dotN 'replace' ['o' -> 'lo']
            |> expect-to-equal 'loggies'

describe 'tapMut, tapDot*' ->
    var log
    var obj
    before-each ->
        log := jest.fn()
        obj :=
            name: 'cat'
            'get-name': -> @name
            'reverse-name-mut': -> @name = reverse @name
            'bark-io': -> log 'rough'
            'speak-io': (word) -> log word
            jump: (where, how-high) -> "jumping #how-high #where"
            garble: (...all) -> log join '!' all

    describe 'aliases' ->
        normal = [tap, tap-dot, tap-dot1, tap-dot2, tap-dot3, tap-dot-n]
        mut = [tap-mut, tap-dot-mut, tap-dot1-mut, tap-dot2-mut, tap-dot3-mut, tap-dot-n-mut]
        names = ['tap-mut', 'tap-dot-mut', 'tap-dot1-mut', 'tap-dot2-mut', 'tap-dot3-mut', 'tap-dot-n-mut']
        zip-all normal, mut, names
        |> each ([alias-l, alias-r, name]) ->
            test name, ->
                (expect alias-l).to-be alias-r
    describe 'tapMut' ->
        test 'array' ->
            [2 to 4]
            |> tap-mut (x) -> x.push 5
            |> tap-mut (x) -> x.unshift 1
            |> expect-to-equal [1 to 5]
    describe 'tapDot' ->
        test 'array 1' ->
            [1 to 4]
            |> tap-dot-mut 'shift'
            |> expect-to-equal [2 to 4]
        test 'array 2' ->
            [1 to 4]
            |> tap-dot-mut 'reverse'
            |> expect-to-equal [4 to 1 by -1]
        test 'user-obj' ->
            obj
            |> tap-dot 'bark-io'
            |> tap-dot-mut 'reverse-name-mut'
            |> dot 'get-name'
            |> expect-to-equal 'tac'

            log.mock.calls.length
            |> expect-to-equal 1
    describe 'tapDot1' ->
        test 'array' ->
            [1 to 4]
            |> tap-dot1 'concat' 5
            |> expect-to-equal [1 to 4]
        test 'user-obj' ->
            obj
            |> tap-dot1 'speak-io' 'hello'
            |> expect-to-be obj

            log.mock.calls
            |> expect-to-equal [['hello']]
    describe 'tapDot2' ->
        test 'array' ->
            [1 to 4]
            |> tap-dot2 'concat' 5 6
            |> expect-to-equal [1 to 4]
        test 'user-obj' ->
            obj
            |> tap-dot2 'garble' 'hello' 'goodbye'
            |> expect-to-be obj

            log.mock.calls
            |> expect-to-equal [['hello!goodbye']]
    describe 'tapDot3' ->
        test 'array' ->
            [1 to 4]
            |> tap-dot3 'concat' 5 6 7
            |> expect-to-equal [1 to 4]
        test 'user-obj' ->
            obj
            |> tap-dot3 'garble' 'hello' 'goodbye' 'hello'
            |> expect-to-be obj

            log.mock.calls
            |> expect-to-equal [['hello!goodbye!hello']]
    describe 'tapDotN' ->
        test 'array' ->
            [1 to 4]
            |> tap-dot-n 'concat' [1 2 3]
            |> expect-to-equal [1 to 4]
        test 'user-obj' ->
            obj
            |> tap-dot-n 'garble' ['hello' 'goodbye' 'hello']
            |> expect-to-be obj

            log.mock.calls
            |> expect-to-equal [['hello!goodbye!hello']]
    describe 'tapDot combine' ->
        test 'array' ->
            [2, 3, 4]
            |> tap-dot1-mut 'push' 5
            |> tap-dot2-mut 'push' 6 7
            |> tap-dot3-mut 'push' 8 9 10
            |> tap-dot-n-mut 'push' [11 12]
            |> tap-dot1-mut 'unshift' 1
            |> expect-to-equal [1 to 12]
    describe 'tapDot' ->
        test 'array' ->
        test 'user-obj' ->
    describe 'tapDot' ->
        test 'array' ->
        test 'user-obj' ->
    describe 'tapDot' ->
        test 'array' ->
        test 'user-obj' ->
    describe 'tapDot' ->
        test 'array' ->
        test 'user-obj' ->
    describe 'tapDot' ->
        test 'array' ->
        test 'user-obj' ->

describe 'bitwise' ->
    describe 'bitwiseAnd' ->
        test 1 ->
            bitwise-and 7 3
            |> expect-to-equal 3
        test 'curried' ->
            3
            |> bitwise-and 7
            |> expect-to-equal 3
    describe 'bitwiseOr' ->
        test 1 ->
            bitwise-or 7 3
            |> expect-to-equal 7
        test 'curried' ->
            3
            |> bitwise-or 7
            |> expect-to-equal 7
    describe 'bitwiseXor' ->
        test 1 ->
            bitwise-xor 7 3
            |> expect-to-equal 4
        test 2 ->
            bitwise-xor 7 1
            |> expect-to-equal 6
        test 'curried' ->
            3
            |> bitwise-xor 7
            |> expect-to-equal 4
    describe 'bitwiseNot' ->
        niet = (x) -> -(x + 1)
        test 1 ->
            bitwise-not 7
            |> expect-to-equal niet 7
        test 2 ->
            bitwise-not 4
            |> expect-to-equal niet 4
    describe 'bitwiseLeft' ->
        test 1 ->
            bitwise-left 7 1
            |> expect-to-equal 14
        test 2 ->
            bitwise-left 5 2
            |> expect-to-equal 20
        test 'curried' ->
            1
            |> bitwise-left 7
            |> expect-to-equal 14
    describe 'bitwiseRight' ->
        test 1 ->
            bitwise-right 14 1
            |> expect-to-equal 7
        test 2 ->
            bitwise-right 20 2
            |> expect-to-equal 5
        test 3 ->
            bitwise-right -7 1
            |> expect-to-equal -4
        test 'curried' ->
            1
            |> bitwise-right 14
            |> expect-to-equal 7
    describe 'bitwiseRightZeroFill' ->
        test 1 ->
            bitwise-right-zero-fill 14 1
            |> expect-to-equal 7
        test 2 ->
            bitwise-right-zero-fill 20 2
            |> expect-to-equal 5
        test 3 ->
            bitwise-right-zero-fill -7 1
            |> expect-to-equal 2147483644
        test 'curried' ->
            1
            |> bitwise-right-zero-fill 14
            |> expect-to-equal 7
    describe 'combine' ->
        test 1 ->
            i = 12345
            -1 |> bitwise-xor i
            |> expect-to-equal bitwise-not i


/*
a = [1 2 3]
b = ['one' 'two']
c = ['un' 'deux' 'trois']

zip-all a, b, c
|> console.log
*/

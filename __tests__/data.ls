{
    assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, join, split, prop: rProp, path: rPath, defaultTo: rDefaultTo, curry, forEach: each, complement, isNil,
    repeat: rRepeat,
    times: r-times,
    reverse,
    tap,
    flip,
    zip,
} = require 'ramda'

{
    test, xtest,
    expect-to-equal, expect-to-be,
} = require './common'

{
    default-to, default-to__,

    assoc-mut,
    append-to, append-to-mut, append-from, append-from-mut,
    prepend-from, prepend-from-mut, prepend-to, prepend-to-mut,
    concat-to, concat-to-mut, concat-from, concat-from-mut,

    merge-to, merge-from, merge-to-mut, merge-from-mut,
    merge-to-in, merge-from-in, merge-to-in-mut, merge-from-in-mut,
    inject-to-mut, inject-from-mut,

    map-pairs, map-pairs-in, each-obj-in,
    apply-scalar, pass-scalar,

} = require '../lib/index'

describe 'default to' ->
    test 1 ->
        false
        |> default-to -> 42
        |> expect-to-equal false
    test 2 ->
        null
        |> default-to -> 42
        |> expect-to-equal 42
    test 3 ->
        void
        |> default-to -> 42
        |> expect-to-equal 42

describe 'default to __' ->
    test 1 ->
        default-to__ false -> 42
        |> expect-to-equal false
    test 2 ->
        default-to__ null -> 42
        |> default-to -> 42
        |> expect-to-equal 42
    test 3 ->
        default-to__ void -> 42
        |> default-to -> 42
        |> expect-to-equal 42

describe 'data transforms' ->
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

    describe 'assocMut' ->
        test 1 ->
            orig = a: 1 b:2
            nieuw = orig
                |> assoc-mut 'b' 3
            (expect nieuw).to-be orig
            (expect nieuw).to-equal a: 1 b: 3

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
        test 'alias inject-to-mut' ->
            inject-to-mut
            |> expect-to-equal merge-to-mut

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
        test 'alias inject-from-mut' ->
            inject-from-mut
            |> expect-to-equal merge-from-mut

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

describe 'mapPairs' ->
    test 'obj' ->
        ({ how: 'fine' }
        |> Object.create)

        <<<
            are: 'thanks'
            you: 'and you?'

        |> map-pairs (k, v) ->
            [k.to-upper-case(), 'yes, ' + v]
        |> expect-to-equal do
            ARE: 'yes, thanks'
            YOU: 'yes, and you?'
    test 'array' ->
        ['how' 'fine' 'are' 'thanks' 'you' 'and you?']
        |> map-pairs (k, v) ->
            [k.to-upper-case(), 'yes, ' + v]
        |> expect-to-equal do
            HOW: 'yes, fine'
            ARE: 'yes, thanks'
            YOU: 'yes, and you?'

describe 'mapPairsIn' ->
    test 1 ->
        ({ how: 'fine' }
        |> Object.create)

        <<<
            are: 'thanks'
            you: 'and you?'

        |> map-pairs-in (k, v) ->
            [k.to-upper-case(), 'yes, ' + v]
        |> expect-to-equal do
            HOW: 'yes, fine'
            ARE: 'yes, thanks'
            YOU: 'yes, and you?'

describe 'eachObjIn' ->
    test 'also enumerates prototype vals' ->
        ret = []
        do ->
            how: 'fine'
            are: 'thanks'
        |> Object.create
        |> each-obj-in (v, k) ->
            ret.push k
            ret.push v

        ret |> expect-to-equal <[ how fine are thanks ]>

            # --- apply function to arguments has more hits on google.
            # --- maybe pass -> prams
            #
            # --- apply -> func

describe 'applyScalar' ->
    test 1 ->
        [1 2 3]
        |> apply-scalar [(* 2), ( + 1), (/ 2)]
        |> expect-to-equal [2 3 1.5]

describe 'passScalar' ->
    test 1 ->
        [(* 2), ( + 1), (/ 2)]
        |> pass-scalar [1 2 3]
        |> expect-to-equal [2 3 1.5]

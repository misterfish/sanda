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
    array-ls,
    test, xtest,
    expect-to-equal, expect-to-be,
} = require './common'

{
    ok,

    exception, raise, die, decorate-exception,
    zip-all,

    bind, bind-late, bind-try,
    cascade, flip-c,
    sprintf1, sprintf-n,

    given, laat, given-star, laat-star,

    nieuw, nieuw1, nieuw2, nieuw3, nieuw-n,

    x-reg-exp,
    x-match, x-match-str, #match

} = main = require '../lib/index'

describe 'cascade' ->
    test 1 ->
        odd = (x) -> x % 2 != 0
        cascade do
            [1 to 5]
            filter (odd)
            map (* 2)
        |> expect-to-equal [2 6 10]

describe 'bind*' ->
    obj =
        name: 'dog'
        speak: -> 'my name is ' + @name
        garble: (...args) -> join '!' args

    # --- common to all.
    zip [bind, bind-late, bind-try] <[ bind bindLate bindTry ]>
    |> each ([bind-func, bind-func-name]) ->
        describe bind-func-name, ->
            test 'binds' ->
                bad-speak = obj.speak
                (expect bad-speak()).not.to-equal 'my name is dog'

                good-speak = bind-func obj, 'speak'
                (expect good-speak()).to-equal 'my name is dog'
            test 'passes args' ->
                garble = bind-func obj, 'garble'
                garble 'a' 1 'c'
                |> expect-to-equal 'a!1!c'
            test 'curried' ->
                'speak'
                |> bind-func obj
                |> (x) -> x()
                |> expect-to-equal 'my name is dog'

    describe 'bind hard' ->
        test 'fails on undefined function' ->
            (expect -> obj.squeak()).to-throw TypeError
    describe 'bind late' ->
        test '1' ->
            obj2 = {}
            bound = 'speak' |> bind-late obj2
            (expect -> bound()).to-throw TypeError
            obj2.speak = -> 'spoke'
            (expect bound()).to-equal 'spoke'
    describe 'bind try' ->
        test 'returns undefined on bad bind' ->
            bind-try obj, 'squeqk'
            |> expect-to-equal void
    describe 'forms' ->
        xtest '1' ->
            bindTry(obj, 'speak') |> if-ok

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
                ten + twelve + nineteen + two
                |> expect-to-equal 43
    test 'recursive references, second arg optional' ->
        laat-star do
            [
                10
                (ten) -> ten + 2
                (ten, twelve) -> twelve + 7
                (ten, twelve, nineteen) -> 2
                (ten, twelve, nineteen, two) ->
                    ten + twelve + nineteen + two
                    |> expect-to-equal 43
            ]
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
                ten + twelve + nineteen + two + five
                |> expect-to-equal 48
    test 'fibonacci' ->
        fibonacci = (n) ->
            sum-last-two = (xs) -> xs[*-1] + xs[*-2]
            entry = (...prev) ->
                m = prev.length
                switch
                | m == 0 => 1
                | m == 1 => 1
                | otherwise => sum-last-two prev
            refs = r-repeat entry, n + 1
            laat-star refs, array-ls

        (expect fibonacci 0).to-equal [1]
        (expect fibonacci 1).to-equal [1 1]
        (expect fibonacci 2).to-equal [1 1 2]
        (expect fibonacci 8).to-equal [1 1 2 3 5 8 13 21 34]
        (expect fibonacci 9).to-equal [1 1 2 3 5 8 13 21 34 55]

describe 'sprintf*' ->
    describe 'sprintf1' ->
        test 1 ->
            'dog'
            |> sprintf1 'my name is %s'
            |> expect-to-equal 'my name is dog'
        test 2 ->
            10/3
            |> sprintf1 'my name is %0.2f'
            |> expect-to-equal 'my name is 3.33'
    describe 'sprintfn' ->
        test 1 ->
            ['is' 'dog']
            |> sprintf-n 'my name %s not %s'
            |> expect-to-equal 'my name is not dog'
        test 2 ->
            ['is' 10/3]
            |> sprintf-n 'my name %s %0.2f'
            |> expect-to-equal 'my name is 3.33'

describe 'zip-all' ->
    test 1 ->
        zip-all do
            [1 2 3]
            <[ un deux trois ]>
        |> expect-to-equal [
            [1 'un'] [2 'deux'] [3 'trois']
        ]
    test 2 ->
        zip-all do
            <[ un deux trois ]>
            <[ yek do seh ]>
            <[ egy ketto harom ]>
        |> expect-to-equal [
            <[ un yek egy ]>
            <[ deux do ketto ]>
            <[ trois seh harom ]>
        ]
    test "two args equivalent to ramda's zip" ->
        zip-all do
            <[ un yek egy ]>
            <[ yek do seh ]>
        |> expect-to-equal zip do
            <[ un yek egy ]>
            <[ yek do seh ]>

# --- move XXX

describe 'exceptions' ->
    test 'exception' ->
        exception 'a' 'b' 'c'
        |> expect-to-equal new Error ('a b c')
    test 'raise' ->
        (expect -> new Error 'bad news' |> raise).to-throw 'bad news'
    test 'die' ->
        (expect -> die 'really' 'bad' 'news').to-throw 'really bad news'
    test 'decorate exception' ->
        new Error 'file not found'
        |> decorate-exception 'bad news:'
        |> expect-to-equal new Error 'bad news: file not found'
    test 'all' ->
        (expect ->
            'file not found'
            |> exception
            |> decorate-exception 'bad news:'
            |> raise
        ).to-throw 'bad news: file not found'

describe 'new' ->
    class C
        (...args) -> @nums = args
        speak: -> join ' ' [
            'henlo'
            ...@nums
        ]

    test 'nieuw' ->
        nieuw C
        |> (.speak())
        |> expect-to-equal 'henlo'

    test 'nieuw1' ->
        10
        |> nieuw1 C
        |> (.speak())
        |> expect-to-equal 'henlo 10'

    test 'nieuw2' ->
        (nieuw2 C) 20 30
        |> (.speak())
        |> expect-to-equal 'henlo 20 30'

    test 'nieuw3' ->
        (nieuw3 C) 2 4 6
        |> (.speak())
        |> expect-to-equal 'henlo 2 4 6'

    test 'nieuwN' ->
        [4 8 9]
        |> nieuw-n C
        |> (.speak())
        |> expect-to-equal 'henlo 4 8 9'

describe 'match/regex' ->
    test 'x-regexp' ->
        re = x-reg-exp ' ( o . s ) '
        'horses'
        |> (.match re)
        |> (m) -> m.1
        |> expect-to-equal 'ors'
    test 'match' ->
        re = new RegExp '(o.s)'
        'horses'
        |> main.match re
        |> (m) -> m.1
        |> expect-to-equal 'ors'
    test 'xmatch' ->
        re = new RegExp ' ( o . s ) '
        'horses'
        |> x-match re
        |> (m) -> m.1
        |> expect-to-equal 'ors'
    test 'xmatch-str' ->
        re-str = ' ( o . s ) '
        'horses'
        |> x-match-str re-str
        |> (m) -> m.1
        |> expect-to-equal 'ors'

# defaultTo

# defaultTo

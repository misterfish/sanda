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

zip-all = (...xss) ->
    l = xss.0.length
    for i from 0 to l - 1
        [xs[i] for xs in xss]

{
    ok,

    cascade, bind, flip-c, compact, compact-ok,
    times, repeat,
    sprintf1, sprintf-n,

    given, laat, given-star, laat-star,

} = require '../lib/index'

describe 'cascade' ->
    test 1 ->
        odd = (x) -> x % 2 != 0
        cascade do
            [1 to 5]
            filter (odd)
            map (* 2)
        |> expect-to-equal [2 6 10]

describe 'bind' ->
    obj =
        name: 'dog'
        speak: -> 'my name is ' + @name
        garble: (...args) -> join '!' args
    test 'binds' ->
        bad-speak = obj.speak
        (expect bad-speak()).not.to-equal 'my name is dog'

        good-speak = bind obj, 'speak'
        (expect good-speak()).to-equal 'my name is dog'
    test 'passes args' ->
        garble = bind obj, 'garble'
        garble 'a' 1 'c'
        |> expect-to-equal 'a!1!c'
    test 'curried' ->
        'speak'
        |> bind obj
        |> (x) -> x()
        |> expect-to-equal 'my name is dog'

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
            refs = times n + 1, -> entry
            laat-star refs, array-ls

        (expect fibonacci 0).to-equal [1]
        (expect fibonacci 1).to-equal [1 1]
        (expect fibonacci 2).to-equal [1 1 2]
        (expect fibonacci 8).to-equal [1 1 2 3 5 8 13 21 34]
        (expect fibonacci 9).to-equal [1 1 2 3 5 8 13 21 34 55]

describe 'repeat' ->
    test 1 ->
        'thing'
        |> repeat 5
        |> expect-to-equal ['thing'] * 5

describe 'times' ->
    thing = (i) -> i
    test 1 ->
        thing
        |> times 5
        |> expect-to-equal [0 to 4]

describe 'compact*' ->
    mixed = [1 '' 0 '0' void false true 2]
    falsey = [false void null '' 0 NaN]
    truthy = [true '0' [] {} -1 Infinity]
    describe 'compact' ->
        test 1 ->
            mixed
            |> compact
            |> expect-to-equal [
                1 '0' true 2
            ]
        test 'all falsey' ->
            falsey
            |> compact
            |> expect-to-equal [
            ]
        test 'all truthy' ->
            truthy
            |> compact
            |> expect-to-equal truthy
    describe 'compactOk' ->
        test 1 ->
            mixed
            |> compact-ok
            |> expect-to-equal [
                1 '' 0 '0' false true 2
            ]
        test 'all falsey' ->
            falsey
            |> compact-ok
            |> expect-to-equal [
                false '' 0 NaN
            ]
        test 'all truthy' ->
            truthy
            |> compact-ok
            |> expect-to-equal truthy

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


# defaultTo

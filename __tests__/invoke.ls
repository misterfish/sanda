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
    array, zip-all,

    invoke, invoke1, invoke2, invoke3, invoke-n,
    call, call1, call2, call3, call-n,
    call-on, call-on1, call-on2, call-on3, call-on-n,
    call-under, call-under1, call-under2,
} = require '../lib/index'

describe 'invoke*' ->
    func = -> 'horse'
    sum-all = (...args) -> args |> reduce ((a, b) -> a + b), 0
    describe 'invoke' ->
        test 1 ->
            func
            |> invoke
            |> expect-to-equal 'horse'
        test 2 ->
            sum-all
            |> invoke
            |> expect-to-equal 0
    describe 'invoke1' ->
        test 1 ->
            sum-all
            |> invoke1 12
            |> expect-to-equal 12
        test 2 ->
            (+ 4)
            |> invoke1 12
            |> expect-to-equal 16
        test 'discards extra args 1' ->
            func
            |> invoke1 'abc'
            |> expect-to-equal 'horse'
    describe 'invoke2' ->
        test 1 ->
            sum-all
            |> invoke2 12 13
            |> expect-to-equal 25
        test 2 ->
            (+)
            |> invoke2 20 30
            |> expect-to-equal 50
    describe 'invoke3' ->
        test 1 ->
            sum-all
            |> invoke3 12 13 14
            |> expect-to-equal 39
        test 'discards' ->
            (+)
            |> invoke3 20 30 40
            |> expect-to-equal 50
    describe 'invokeN' ->
        test 1 ->
            sum-all
            |> invoke-n [12 to 15]
            |> expect-to-equal 54
        test 2 ->
            (+)
            |> invoke-n [20 30]
            |> expect-to-equal 50

describe 'call*' ->
    obj =
        name: 'dog'
        speak: -> 'my name is ' + @name
        speak1: (word) -> "my #word is " + @name
        speak-all: array-ls >> join ':'
    describe 'aliases' ->
        normal = [call-on, call-on1, call-on2, call-on3, call-on-n]
        alias = [call, call1, call2, call3, call-n]
        names = ['call', 'call1', 'call2', 'call3', 'call-n']

        zip-all normal, alias, names
        |> each ([alias-l, alias-r, name]) ->
            test name, ->
                (expect alias-l).to-be alias-r
    describe 'callOn' ->
        test 'array' ->
            [].reverse
            |> call-on [1 to 3]
            |> expect-to-equal [3 to 1]
        test 'user-obj' ->
            obj.speak
            |> call-on obj
            |> expect-to-equal 'my name is dog'
    describe 'callOn1' ->
        test 'array' ->
            [].concat
            |> call-on1 [1 to 3] 4
            |> expect-to-equal [1 to 4]
        test 'user-obj' ->
            obj.speak1
            |> call-on1 obj, 'friend'
            |> expect-to-equal 'my friend is dog'
    describe 'callOn2' ->
        test 'array' ->
            [].concat
            |> call-on2 [1 to 3] 4 5
            |> expect-to-equal [1 to 5]
        test 'user-obj, discards' ->
            obj.speak1
            |> call-on2 obj, 'friend' 'send'
            |> expect-to-equal 'my friend is dog'
        test 'user-obj' ->
            obj.speak-all
            |> call-on2 obj, 'friend' 'send'
            |> expect-to-equal 'friend:send'
    describe 'callOn3' ->
        test 'array' ->
            [].concat
            |> call-on3 [1 to 3] 4 5 6
            |> expect-to-equal [1 to 6]
        test 'user-obj' ->
            obj.speak-all
            |> call-on3 obj, 'friend' 'send' 'end'
            |> expect-to-equal 'friend:send:end'
    describe 'callOnN' ->
        test 'array' ->
            [].concat
            |> call-on-n [1 to 3] [4 5 6]
            |> expect-to-equal [1 to 6]
        test 'user-obj' ->
            obj.speak-all
            |> call-on-n obj, ['friend' 'lend']
            |> expect-to-equal 'friend:lend'

    describe 'callUnder' ->
        test 'array' ->
            [1 to 3]
            |> call-under [].reverse
            |> expect-to-equal [3 to 1]
        test 'bound function alias' ->
            trim = call-under ''.trim
            trim ' dog '
            |> expect-to-equal 'dog'
        test 'user-obj' ->
            obj
            |> call-under obj.speak
            |> expect-to-equal 'my name is dog'
    describe 'callUnder1' ->
        test 'array' ->
            [1 to 3]
            |> call-under1 [].concat, 4
            |> expect-to-equal [1 to 4]
        test 'user-obj' ->
            obj
            |> call-under1 obj.speak1, 'friend'
            |> expect-to-equal 'my friend is dog'
    describe 'callUnder2' ->
        test 'bound function alias' ->
            replace-dl = call-under2 ''.replace, 'd' 'l'
            replace-dl 'dog'
            |> expect-to-equal 'log'

# move XXX
describe 'array' ->
    test 1 ->
        array 3 4 5
        |> expect-to-equal [3 to 5]
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

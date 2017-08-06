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
    if-true, cond-true,
    if-true-RF,
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

    tests = array-ls do
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

    tests = array-ls do
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

    tests = array-ls do
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

describe 'try/catch' ->
    danger = -> throw new Error
    safe = -> 99
    test 'should fail' ->
        catcher = jest.fn()
            ..mock-return-value 10
        try-catch danger, catcher
        |> expect-to-equal 10
    test 'should succeed' ->
        catcher = jest.fn()
            ..mock-return-value 10
        try-catch safe, catcher
        |> expect-to-equal 99


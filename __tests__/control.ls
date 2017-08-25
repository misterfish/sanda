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
    if-true, when-true,
    if-true__,
    try-catch,
} = require '../lib/index'

do-test-double-arm = (fn, { curried }, { desc, input-val, expect-num-calls, expect-ret, }) --> test desc, ->
    [ja-val, nee-val] = [42 43]

    ja = jest.fn ()
        ..mock-return-value ja-val
    nee = jest.fn ()
        ..mock-return-value nee-val

    ret = if curried then input-val |> fn ja, nee
    else fn ja, nee, input-val

    expect-num-calls.0 |> (expect ja.mock.calls.length).to-equal
    expect-num-calls.1 |> (expect nee.mock.calls.length).to-equal

    expect-ret |> (expect ret).to-equal

do-test-single-arm = (fn, { curried }, { desc, input-val, expect-num-calls, expect-ret, }) --> test desc, ->
    ja-val = 42
    ja = jest.fn ()
        ..mock-return-value ja-val

    ret = if curried then input-val |> fn ja
    else fn ja, input-val

    expect-num-calls |> (expect ja.mock.calls.length).to-equal
    expect-ret |> (expect ret).to-equal

    (expect ret).to-equal expect-ret

describe 'whenTrue' ->
    do-test = do-test-single-arm

    tests = array-ls do
        *   desc: 'true'
            input-val: true
            expect-num-calls: 1
            expect-ret: 42
        *   desc: 'false'
            input-val: false
            expect-num-calls: 0
            expect-ret: void
        *   desc: 'empty string'
            input-val: ''
            expect-num-calls: 0
            expect-ret: void
        *   desc: 'undefined'
            input-val: void
            expect-num-calls: 0
            expect-ret: void

    tests |> each do-test when-true, { +curried }

describe 'ifTrue' ->
    do-test = do-test-double-arm

    tests = array-ls do
        *   desc: 'true'
            input-val: true
            expect-num-calls: [1 0]
            expect-ret: 42
        *   desc: 'false'
            input-val: false
            expect-num-calls: [0 1]
            expect-ret: 43
        *   desc: 'empty string'
            input-val: ''
            expect-num-calls: [0 1]
            expect-ret: 43

    tests |> each do-test if-true, { +curried }

describe 'ifTrue__' ->
    fn = if-true__

    tests = array-ls do
        *   desc: 'true'
            input-val: true
            do-nee: true
            arms: 2
            expect-num-calls: [1 0]
            expect-ret: 42
        *   desc: 'true, no else'
            input-val: true
            arms: 1
            expect-num-calls: [1 0]
            expect-ret: 42
        *   desc: 'false'
            input-val: false
            arms: 2
            expect-num-calls: [0 1]
            expect-ret: 43
        *   desc: 'false, no else'
            input-val: false
            arms: 1
            expect-num-calls: [0 0]
            expect-ret: void

    tests |> each (spec) ->
        arms = delete spec.arms
        do-test = if arms == 2 then do-test-double-arm else do-test-single-arm
        (do-test fn { -curried }) spec


# describe 'ifFunction' ->
#     do-test = (fn, { desc, input-val, ja-val, nee-val, expect-num-calls, expect-ret, }) --> test desc, ->
#         ja = jest.fn ()
#             ..mock-return-value ja-val
#         nee = jest.fn ()
#             ..mock-return-value nee-val
#         ret = input-val |> fn ja, nee
#
#         expect-num-calls.0 |> (expect ja.mock.calls.length).to-equal
#         expect-num-calls.1 |> (expect nee.mock.calls.length).to-equal
#
#         expect-ret |> (expect ret).to-equal
#
#     # --- abstract away ja-val and nee-val XXX
#     tests = array-ls do
#         *   desc: 'function'
#             input-val: ->
#             ja-val: 42
#             nee-val: 43
#             expect-num-calls: [1 0]
#             expect-ret: 42
#         *   desc: 'not function'
#             input-val: false
#             ja-val: 42
#             nee-val: 43
#             expect-num-calls: [0 1]
#             expect-ret: 43
#         *   desc: 'empty string'
#             input-val: ''
#             ja-val: 42
#             nee-val: 43
#             expect-num-calls: [0 1]
#             expect-ret: 43
#
#     tests |> each do-test if-true
#
# describe 'ifFunction__' ->

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


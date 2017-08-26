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
    try-catch, try-catch__,
} = require '../lib/index'

describe 'try/catch__' ->
    fails = -> throw new Error
    passes = -> 99

    how-to-fail = jest.fn()
        ..mock-return-value 'failed'

    test 'should fail' ->
        try-catch__ fails, how-to-fail
        |> expect-to-equal 'failed'
    test 'should succeed' ->
        try-catch__ passes, how-to-fail
        |> expect-to-equal 99

describe 'try/catch' ->
    fails = -> throw new Error
    passes = -> 99

    how-to-pass = jest.fn()
        ..mock-implementation (x) -> [x, x, x]
    how-to-fail = jest.fn()
        ..mock-return-value 'failed'

    test 'should fail' ->
        fails
        |> try-catch how-to-pass, how-to-fail
        |> expect-to-equal 'failed'
    test 'should succeed, and pass params' ->
        passes
        |> try-catch how-to-pass, how-to-fail
        |> expect-to-equal [99 99 99]


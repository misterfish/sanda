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
    try-catch,
} = require '../lib/index'

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


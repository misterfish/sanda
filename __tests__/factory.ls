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
    factory,
} = require '../lib/index'

describe 'factory ' ->
    prehistoric-proto =
        ooze: -> 'ooze'

    animal-proto = (Object.create prehistoric-proto) <<<
        walk: -> 'walk'
        confess: -> 'I am ' + @color

    { proto, create, } = factory animal-proto

    red-animal = create color: 'red'
    blue-animal = create color: 'blue'

    test 1 ->
        red-animal.confess()
        |> expect-to-equal 'I am red'

        blue-animal.confess()
        |> expect-to-equal 'I am blue'
    test 'proto chain multi-level' ->
        red-animal.ooze()
        |> expect-to-equal 'ooze'

{
    assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, join, split, prop: rProp, path: rPath, defaultTo: rDefaultTo, curry, forEach: each, complement, isNil,
    repeat: rRepeat,
    times: r-times,
    reverse,
    tap,
    flip,
    keys,
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

    describe 1 ->
        { proto, create, } = factory animal-proto

        test 'main' ->
            red-animal = create color: 'red'
            blue-animal = create color: 'blue'

            red-animal.confess()
            |> expect-to-equal 'I am red'

            blue-animal.confess()
            |> expect-to-equal 'I am blue'

        test 'proto' ->
            typeof! proto.ooze
            |> expect-to-equal 'Function'
            typeof! proto.walk
            |> expect-to-equal 'Function'
            typeof! proto.confess
            |> expect-to-equal 'Function'
        test 'instance spec not altered' ->
            instance-spec = color: 'red'
            red-animal = create instance-spec
            instance-spec
            |> expect-to-equal color: 'red'
        test 'proto chain multi-level' ->
            red-animal = create color: 'red'
            red-animal.ooze()
            |> expect-to-equal 'ooze'

    describe 'mixins pre' ->
        hopper =
            hop: -> 'hopper hop'
        topper =
            hop: -> 'topper hop'
            top: -> 'topper top'
        walker =
            pop: -> 'walker pop'
            # --- shouldn't make it to the object.
            walk: -> 'walker walk'

        { proto, create, } = factory animal-proto, [hopper, topper, walker]
        red-animal = create color: 'red'

        test 'mixins pre, right order' ->
            red-animal.confess()
            |> expect-to-equal 'I am red'
            red-animal.hop()
            |> expect-to-equal 'topper hop'
            red-animal.top()
            |> expect-to-equal 'topper top'
            red-animal.pop()
            |> expect-to-equal 'walker pop'
        test "mixins pre doesn't clobber" ->
            red-animal.walk()
            |> expect-to-equal 'walk'

    describe 'mixins pre' ->
        num-keys = keys >> (.length)

        hopper =
            hop: -> 'hopper hop'
        topper =
            hop: -> 'topper hop'
            top: -> 'topper top'
        walker =
            pop: -> 'walker pop'
            # --- shouldn't make it to the object.
            walk: -> 'walker walk'

        { proto, create, } = factory animal-proto, [hopper, topper, walker]
        red-animal = create color: 'red'

        test 'mixins pre, right order' ->
            red-animal.confess()
            |> expect-to-equal 'I am red'
            red-animal.hop()
            |> expect-to-equal 'topper hop'
            red-animal.top()
            |> expect-to-equal 'topper top'
            red-animal.pop()
            |> expect-to-equal 'walker pop'
        test "mixins pre doesn't clobber" ->
            red-animal.walk()
            |> expect-to-equal 'walk'
        test 'mixins not altered' ->
            (num-keys hopper) |> expect-to-equal 1
            (num-keys topper) |> expect-to-equal 2
            (num-keys walker) |> expect-to-equal 2

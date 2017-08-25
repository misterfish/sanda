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
    when-true, if-true, if-true__,
    when-function, if-function, if-function__,

} = require '../lib/index'

# --- note that num-arms is part of the test spec, not describe spec
# (because of the __ variants).

do-tests = (describe-spec, tests) -->
    tests |> each (test-spec) ->
        num-arms = delete test-spec.num-arms ? 1
        the-test = if num-arms == 2 then do-test-double-arm else do-test-single-arm
        the-test describe-spec, test-spec

do-test-double-arm = ({ fn, is__ }, { desc, input-val, expect-branch, }) --> test desc, ->
    [ja-val, nee-val] = [42 43]

    ja = jest.fn ()
        ..mock-return-value ja-val
    nee = jest.fn ()
        ..mock-return-value nee-val

    ret = if not is__ then input-val |> fn ja, nee
    else fn input-val, ja, nee

    [expected-ret, expected-calls-ja, expected-calls-nee] =
        if expect-branch == 'ja' then [ja-val, 1, 0]
        else [nee-val, 0, 1]

    expected-calls-ja |> (expect ja.mock.calls.length).to-equal
    expected-calls-nee |> (expect nee.mock.calls.length).to-equal

    ret |> expect-to-equal expected-ret

do-test-single-arm = ({ fn, is__ }, { desc, input-val, expect-branch, }) --> test desc, ->
    [ja-val, nee-val] = [42 void]
    ja = jest.fn ()
        ..mock-return-value ja-val

    ret = if not is__ then input-val |> fn ja
    else fn input-val, ja

    [expected-ret, expected-calls-ja] =
        if expect-branch == 'ja' then [ja-val, 1]
        else [nee-val, 0]

    expected-calls-ja |> (expect ja.mock.calls.length).to-equal

    ret |> expect-to-equal expected-ret

describe 'whenTrue' ->
    describe-spec =
        fn: when-true
        is__: false

    tests = array-ls do
        *   desc: 'true'
            input-val: true
            expect-branch: 'ja'
            num-arms: 1
        *   desc: 'false'
            input-val: false
            expect-branch: 'nee'
            num-arms: 1
        *   desc: 'empty string'
            input-val: ''
            expect-branch: 'nee'
            num-arms: 1
        *   desc: 'undefined'
            input-val: void
            expect-branch: 'nee'
            num-arms: 1

    do-tests describe-spec, tests

describe 'ifTrue' ->
    describe-spec =
        fn: if-true
        is__: false

    tests = array-ls do
        *   desc: 'true'
            input-val: true
            expect-branch: 'ja'
            num-arms: 2
        *   desc: 'false'
            input-val: false
            expect-branch: 'nee'
            num-arms: 2
        *   desc: 'empty string'
            input-val: ''
            expect-branch: 'nee'
            num-arms: 2

    do-tests describe-spec, tests

describe 'ifTrue__' ->
    describe-spec =
        fn: if-true__
        is__: true

    tests = array-ls do
        *   desc: 'true'
            input-val: true
            expect-branch: 'ja'
            num-arms: 2
        *   desc: 'true, no else'
            input-val: true
            expect-branch: 'ja'
            num-arms: 1
        *   desc: 'false'
            input-val: false
            expect-branch: 'nee'
            num-arms: 2
        *   desc: 'false, no else'
            input-val: false
            expect-branch: 'nee'
            num-arms: 1

    do-tests describe-spec, tests

describe 'whenFunction' ->
    describe-spec =
        fn: when-function
        is__: false

    tests = array-ls do
        *   desc: 'function'
            input-val: ->
            expect-branch: 'ja'
            num-arms: 1
        *   desc: 'false'
            input-val: false
            expect-branch: 'nee'
            num-arms: 1
        *   desc: 'empty string'
            input-val: ''
            expect-branch: 'nee'
            num-arms: 1
        *   desc: 'undefined'
            input-val: void
            expect-branch: 'nee'
            num-arms: 1
        *   desc: 'array'
            input-val: []
            expect-branch: 'nee'
            num-arms: 1

    do-tests describe-spec, tests

describe 'ifFunction' ->
    describe-spec =
        fn: if-function
        is__: false

    tests = array-ls do
        *   desc: 'function'
            input-val: ->
            expect-branch: 'ja'
            num-arms: 2
        *   desc: 'false'
            input-val: false
            expect-branch: 'nee'
            num-arms: 2
        *   desc: 'empty string'
            input-val: ''
            expect-branch: 'nee'
            num-arms: 2
        *   desc: 'array'
            input-val: []
            expect-branch: 'nee'
            num-arms: 2

    do-tests describe-spec, tests

describe 'ifFunction__' ->
    describe-spec =
        fn: if-function__
        is__: true

    tests = array-ls do
        *   desc: 'function'
            input-val: ->
            expect-branch: 'ja'
            num-arms: 2
        *   desc: 'function, no else'
            input-val: ->
            expect-branch: 'ja'
            num-arms: 1
        *   desc: 'false'
            input-val: false
            expect-branch: 'nee'
            num-arms: 2
        *   desc: 'false, no else'
            input-val: false
            expect-branch: 'nee'
            num-arms: 1
        *   desc: 'array'
            input-val: []
            expect-branch: 'nee'
            num-arms: 2
        *   desc: 'array, no else'
            input-val: []
            expect-branch: 'nee'
            num-arms: 1

    do-tests describe-spec, tests

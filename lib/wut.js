#!/usr/bin/env node
'use strict';

var _ramda = require('ramda');

var _fishLib = require('fish-lib');

var _fishLib2 = _interopRequireDefault(_fishLib);

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _op = function _op(a, b) {
    return b(a);
};

var _op2 = function _op2(a, b) {
    return function () {
        return b(a.apply(undefined, arguments));
    };
};

var argsFour = function argsFour(a) {
    return function (b) {
        return function (c) {
            return function (d) {
                return a / b + c + d;
            };
        };
    };
};

_op(argsFour(1)(2)(3)(4), _fishLib.log); // => 7.5

var flippedFour = (0, _index.flipC)(argsFour);

_op(flippedFour(1)(2)(3)(4), _fishLib.log); // => 9

_op(flippedFour(1, 2, 3)(4), _fishLib.log); // => 9

_op(flippedFour(1, 2, 3, 4), _fishLib.log); // => 9

var sum = _op(0, (0, _ramda.reduce)(function (a, b) {
    return a + b;
}));
var thing = (0, _ramda.curryN)(4, function (a, b) {
    for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        rest[_key - 2] = arguments[_key];
    }

    return a + b + _op(rest, sum);
});

_op(thing(1, 2, 3, 4), _fishLib.log);

_op(thing(1, 2, 3)(4), _fishLib.log);

_op(thing(1, 2), _fishLib.log);

_op(thing(1), _fishLib.log);
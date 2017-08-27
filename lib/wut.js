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

var add = function add(a) {
    return function (b) {
        return a / b;
    };
};
var padd = function padd(a, b) {
    return a / b;
};_op(_op(add, _ramda.flip)(5, 10), _fishLib.log);
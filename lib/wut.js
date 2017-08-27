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

_op(_op('lots of pigs', (0, _index.xReplace)(/ (o .. p) /)('stick')), _fishLib.log); // 'lots stickigs'

_op(_op('lots of pigs', (0, _index.xReplace)(/ (o .) /)('po')), _fishLib.log); // 'lpos of pigs'

_op(_op('lots of pigs', (0, _index.xReplace)(/ (o .) /g)('po')), _fishLib.log); // 'lpos po pigs'

_op(_op('lots of pigs', (0, _index.xReplaceStr)(' (o .. p) ')('stick')), _fishLib.log); // 'lots stickigs'

_op(_op('lots of pigs', (0, _index.xReplaceStrFlags)(' (o .) ')('')('po')), _fishLib.log); // 'lpos of pigs'

_op(_op('lots of pigs', (0, _index.xReplaceStrFlags)(' (o .) ')('g')('po')), _fishLib.log); // 'lpos po pigs'
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

var formData = 'old';

var my = {
    parseFormData: function parseFormData(formData) {
        return 'parsed ' + formData;
    }
}

// if (my.parseFormData) {
//     formData = my.parseFormData(formData);
// }

;_op(_op([my, 'parseFormData'], (0, _index.ifBind)((0, _index.pass1)(formData), function () {
    return formData;
})), _fishLib.log);_op(_op([my, 'parseFormData'], (0, _index.whenBind)((0, _index.pass1)(formData))), _fishLib.log);_op(_op([my, 'arseFormData'], (0, _index.whenBind)((0, _index.pass1)(formData))), _fishLib.log);

_op((0, _index.ifBind__)([my, 'parseFomData'], (0, _index.pass1)(formData), function () {
    return 'allen';
}), _fishLib.log);
#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.factory = exports.mergeFish = exports.mergeAllIn = exports.zipAll = exports.array = exports.tryCatch = exports.noop = exports.sprintfN = exports.sprintf1 = exports.compactOk = exports.compact = exports.times = exports.repeat = exports.flipC = exports.laatStar = exports.givenStar = exports.callUnder2 = exports.callUnder1 = exports.callUnder = exports.callN = exports.call3 = exports.call2 = exports.call1 = exports.call = exports.callOnN = exports.callOn3 = exports.callOn2 = exports.callOn1 = exports.callOn = exports.invokeN = exports.invoke3 = exports.invoke2 = exports.invoke1 = exports.invoke = exports.laat = exports.given = exports.defaultTo = exports.defaultToRF = exports.mapAccumIndexed = exports.mapIndexed = exports.mergeFromInMut = exports.mergeToInMut = exports.mergeFromIn = exports.mergeToIn = exports.injectFromMut = exports.injectToMut = exports.mergeFromMut = exports.mergeToMut = exports.mergeFrom = exports.mergeTo = exports.concatFromMut = exports.concatToMut = exports.concatFrom = exports.concatTo = exports.prependToMut = exports.prependFromMut = exports.prependFrom = exports.prependTo = exports.appendFromMut = exports.appendToMut = exports.appendTo = exports.appendFrom = exports.bind = exports.cascade = exports.ifTrueRF = exports.ifTrueElse = exports.condTrue = exports.ifTrue = exports.ifOk = exports.ifOk_ = exports.tapDotNMut = exports.tapDot3Mut = exports.tapDot2Mut = exports.tapDot1Mut = exports.tapDotMut = exports.tapMut = exports.dotNMut = exports.dot3Mut = exports.dot2Mut = exports.dot1Mut = exports.dotMut = exports.tapDotN = exports.tapDot3 = exports.tapDot2 = exports.tapDot1 = exports.tapDot = exports.dotN = exports.dot3 = exports.dot2 = exports.dot1 = exports.dot = exports.ok = exports.bitwiseRightZeroFill = exports.bitwiseRight = exports.bitwiseLeft = exports.bitwiseNot = exports.bitwiseXor = exports.bitwiseOr = exports.bitwiseAnd = undefined;

var _ramda = require('ramda');

var _fishLib = require('fish-lib');

var _fishLib2 = _interopRequireDefault(_fishLib);

var _operator = require('./operator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _op = function _op(a, b) {
    return b(a);
};

var _op2 = function _op2(a, b) {
    return function () {
        return b(a.apply(undefined, arguments));
    };
};

exports.bitwiseAnd = _operator.bitwiseAnd;
exports.bitwiseOr = _operator.bitwiseOr;
exports.bitwiseXor = _operator.bitwiseXor;
exports.bitwiseNot = _operator.bitwiseNot;
exports.bitwiseLeft = _operator.bitwiseLeft;
exports.bitwiseRight = _operator.bitwiseRight;
exports.bitwiseRightZeroFill = _operator.bitwiseRightZeroFill;
var ok = exports.ok = function ok(x) {
    return !(0, _ramda.isNil)(x);
};

var dot = exports.dot = (0, _ramda.curry)(function (prop, o) {
    return o[prop]();
});
var dot1 = exports.dot1 = (0, _ramda.curry)(function (prop, val, o) {
    return o[prop](val);
});
var dot2 = exports.dot2 = (0, _ramda.curry)(function (prop, val1, val2, o) {
    return o[prop](val1, val2);
});
var dot3 = exports.dot3 = (0, _ramda.curry)(function (prop, val1, val2, val3, o) {
    return o[prop](val1, val2, val3);
});
var dotN = exports.dotN = (0, _ramda.curry)(function (prop, vs, o) {
    return o[prop].apply(o, _toConsumableArray(vs));
});

var tapDot = exports.tapDot = function tapDot(prop) {
    return (0, _ramda.tap)(dot(prop));
};
var tapDot1 = exports.tapDot1 = (0, _ramda.curry)(function (prop, val) {
    return (0, _ramda.tap)(dot1(prop)(val));
});
var tapDot2 = exports.tapDot2 = (0, _ramda.curry)(function (prop, val1, val2) {
    return (0, _ramda.tap)(dot2(prop)(val1)(val2));
});
var tapDot3 = exports.tapDot3 = (0, _ramda.curry)(function (prop, val1, val2, val3) {
    return (0, _ramda.tap)(dot3(prop)(val1)(val2)(val3));
});
var tapDotN = exports.tapDotN = (0, _ramda.curry)(function (prop, vs) {
    return (0, _ramda.tap)(dotN(prop)(vs));
});

// --- signal intentions
var dotMut = exports.dotMut = dot;
var dot1Mut = exports.dot1Mut = dot1;
var dot2Mut = exports.dot2Mut = dot2;
var dot3Mut = exports.dot3Mut = dot3;
var dotNMut = exports.dotNMut = dotN;

var tapMut = exports.tapMut = _ramda.tap;
var tapDotMut = exports.tapDotMut = tapDot;
var tapDot1Mut = exports.tapDot1Mut = tapDot1;
var tapDot2Mut = exports.tapDot2Mut = tapDot2;
var tapDot3Mut = exports.tapDot3Mut = tapDot3;
var tapDotNMut = exports.tapDotNMut = tapDotN;

var ifOk_ = exports.ifOk_ = function ifOk_(x, yes, no) {
    return ifOk(yes, no, x);
};
var ifOk = exports.ifOk = (0, _ramda.curry)(function (yes, x) {
    return ok(x) ? yes(x) : void 8;
});

var ifTrue = exports.ifTrue = (0, _ramda.curry)(function (yes, x) {
    return _op(x, condTrue(yes)(function () {
        return void 8;
    }));
});

var condTrue = exports.condTrue = (0, _ramda.curry)(function (yes, no, x) {
    return x === true ? yes(x) : no(x);
});
var ifTrueElse = exports.ifTrueElse = condTrue;

// ------ not data-last.
// ------ not curried.

var ifTrueRF = exports.ifTrueRF = function ifTrueRF(x, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
        return void 8;
    };
    return _op(x, condTrue(yes)(no));
};

var cascade = exports.cascade = function cascade(val) {
    for (var _len = arguments.length, fxs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        fxs[_key - 1] = arguments[_key];
    }

    return _op(fxs, (0, _ramda.reduce)(function (a, b) {
        return b(a);
    }, val));
};

// ------ bind

var bind = exports.bind = (0, _ramda.curry)(function (o, key) {
    return function () {
        return o[key].apply(o, arguments);
    };
});
// --- hasOwn: R.has

// could also be called pushTo and pushToMut, but pushTo for not mut could be confusing.

// [1 2 3] -> [4 5 6] -> [1 2 3 [4 5 6]]
// [] -> a -> []
// export const appendTo = curry (
//     (tgt, src) => [...tgt, src]
// )

// rcvAppend?
// appendRcv?
// appendRC?
// export const appendFrom = rAppend

// ------ append.

var appendFrom = exports.appendFrom = (0, _ramda.curry)(function (elem, ary) {
    return [].concat(_toConsumableArray(ary), [elem]);
});
var appendTo = exports.appendTo = (0, _ramda.flip)(appendFrom);

// [] -> a -> [], mut
var appendToMut = exports.appendToMut = (0, _ramda.curry)(function (tgt, src) {
    tgt.push(src);
    return tgt;
});

// [] -> a -> [], mut
var appendFromMut = exports.appendFromMut = (0, _ramda.flip)(appendToMut);

// ------ prepend.

var prependTo = exports.prependTo = (0, _ramda.curry)(function (ary, elem) {
    return [elem].concat(_toConsumableArray(ary));
});

var prependFrom = exports.prependFrom = (0, _ramda.flip)(prependTo);

var prependFromMut = exports.prependFromMut = (0, _ramda.curry)(function (src, tgt) {
    tgt.unshift(src);
    return tgt;
});

var prependToMut = exports.prependToMut = (0, _ramda.curry)(function (tgt, src) {
    tgt.unshift(src);
    return tgt;
});

// [1 2 3] -> [4 5 6] -> [1 2 3 4 5 6]

// [] -> [] -> []
// [] -> a -> [] => error
// String -> String -> String
var concatTo = exports.concatTo = _ramda.concat;

var concatFrom = exports.concatFrom = (0, _ramda.flip)(_ramda.concat);

// [] -> [] -> [], mut
var concatToMut = exports.concatToMut = (0, _ramda.curry)(function (tgt, src) {
    tgt.push.apply(tgt, _toConsumableArray(src));
    return tgt;
});

var concatFromMut = exports.concatFromMut = (0, _ramda.flip)(concatToMut);

var mergeTo = exports.mergeTo = _ramda.merge;
var mergeFrom = exports.mergeFrom = (0, _ramda.flip)(_ramda.merge);

// --- mut always refers to target.

// --- discards non-own on src.
// --- does not discard non-own on tgt, b/c mut.
var mergeToMut = exports.mergeToMut = (0, _ramda.curry)(function (tgt, src) {
    var ret = tgt;
    for (var i in src) {
        if ((0, _ramda.has)(i, src)) ret[i] = src[i];
    }return ret;
});

var mergeFromMut = exports.mergeFromMut = (0, _ramda.flip)(mergeToMut);

var injectToMut = exports.injectToMut = mergeToMut;
var injectFromMut = exports.injectFromMut = mergeFromMut;

// --- both will float.
var mergeToIn = exports.mergeToIn = (0, _ramda.curry)(function (tgt, src) {
    var ret = {};
    for (var i in tgt) {
        ret[i] = tgt[i];
    }for (var _i in src) {
        ret[_i] = src[_i];
    }return ret;
});

// --- both will float.
var mergeFromIn = exports.mergeFromIn = (0, _ramda.flip)(mergeToIn);

var mergeToInMut = exports.mergeToInMut = (0, _ramda.curry)(function (tgt, src) {
    var ret = tgt;
    for (var i in src) {
        ret[i] = src[i];
    }return ret;
});

var mergeFromInMut = exports.mergeFromInMut = (0, _ramda.flip)(mergeToInMut);

// Object.assign and {...} drop proto vals.

// ----- map indexed.
var mapIndexed = exports.mapIndexed = (0, _ramda.addIndex)(_ramda.map);
var mapAccumIndexed = exports.mapAccumIndexed = (0, _ramda.addIndex)(_ramda.mapAccum);

// --- each obj indexed?
// --- each obj IN

// --- mapzip.

var defaultToRF = exports.defaultToRF = function defaultToRF(x, d) {
    return ok(x) ? x : d();
};

var defaultTo = exports.defaultTo = (0, _ramda.curry)(function (f, x) {
    return ok(x) ? x : f();
});

var given = exports.given = function given(xs, f) {
    return f.apply(null, xs);
};
var laat = exports.laat = given;

var invoke = exports.invoke = function invoke(f) {
    return f();
};
var invoke1 = exports.invoke1 = (0, _ramda.curry)(function (val, f) {
    return f(val);
});
var invoke2 = exports.invoke2 = (0, _ramda.curry)(function (val1, val2, f) {
    return f(val1, val2);
});
var invoke3 = exports.invoke3 = (0, _ramda.curry)(function (val1, val2, val3, f) {
    return f(val1, val2, val3);
});
var invokeN = exports.invokeN = (0, _ramda.curry)(function (vs, f) {
    return f.apply(null, vs);
});

var callOn = exports.callOn = (0, _ramda.curry)(function (o, f) {
    return f.call(o);
});
var callOn1 = exports.callOn1 = (0, _ramda.curry)(function (o, val, f) {
    return f.call(o, val);
});
var callOn2 = exports.callOn2 = (0, _ramda.curry)(function (o, val1, val2, f) {
    return f.call(o, val1, val2);
});
var callOn3 = exports.callOn3 = (0, _ramda.curry)(function (o, val1, val2, val3, f) {
    return f.call(o, val1, val2, val3);
});
var callOnN = exports.callOnN = (0, _ramda.curry)(function (o, vs, f) {
    return f.apply(o, vs);
});

var call = exports.call = callOn;
var call1 = exports.call1 = callOn1;
var call2 = exports.call2 = callOn2;
var call3 = exports.call3 = callOn3;
var callN = exports.callN = callOnN;

var callUnder = exports.callUnder = (0, _ramda.curry)(function (f, o) {
    return f.call(o);
});
var callUnder1 = exports.callUnder1 = (0, _ramda.curry)(function (f, val, o) {
    return f.call(o, val);
});
var callUnder2 = exports.callUnder2 = (0, _ramda.curry)(function (f, val1, val2, o) {
    return f.call(o, val1, val2);
});

var isFunction = _op2(_op2(callUnder({}.toString), dot2('slice')(8, -1)), (0, _ramda.equals)('Function'));

var givenStar = exports.givenStar = function givenStar(xs, f) {
    var xsMapper = function xsMapper(prevVals, v) {
        return isFunction(v) ? v.apply(null, prevVals) : v;
    };

    var ys = _op(_op(xs
    // --- acc contains running output array, up to the previous item.
    , (0, _ramda.mapAccum)(function (acc, v) {
        return _op(xsMapper(acc, v), function (mapped) {
            return [[].concat(_toConsumableArray(acc), [mapped]), mapped];
        });
    }, [])), (0, _ramda.prop)(1));

    return f.apply(null, ys);
};

var laatStar = exports.laatStar = givenStar;

// --- flip first and second args: also works for functions curried with the a => b => ... notation.
var flipC = exports.flipC = (0, _ramda.curry)(function (f) {
    return (0, _ramda.curry)(function (a, b) {
        for (var _len2 = arguments.length, rest = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            rest[_key2 - 2] = arguments[_key2];
        }

        return laat([f(b)(a)], function (interimResult) {
            return rest.length === 0 ? interimResult : _op(rest, (0, _ramda.reduce)(function (a, b) {
                return a(b);
            }, interimResult));
        });
    });
});

// ------ times, repeat

var repeat = exports.repeat = (0, _ramda.flip)(_ramda.repeat);
var times = exports.times = (0, _ramda.flip)(_ramda.times);

var compact = exports.compact = (0, _ramda.filter)(Boolean);
var compactOk = exports.compactOk = (0, _ramda.reject)(_ramda.isNil);

// ------ sprintf

var sprintf1 = exports.sprintf1 = (0, _ramda.curry)(function (str, a) {
    return (0, _fishLib.sprintf)(str, a);
});
var sprintfN = exports.sprintfN = (0, _ramda.curry)(function (str, xs) {
    return _fishLib.sprintf.apply(null, [str].concat(_toConsumableArray(xs)));
});

var noop = exports.noop = function noop() {};

// ------ try catch

var tryCatch = exports.tryCatch = function tryCatch(whatToTry) {
    var howToCatch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

    try {
        return whatToTry();
    } catch (e) {
        return howToCatch(e);
    }
};

// map (+ 2)
// map (.toUpperCase())
//
//
// factory stuff.
//
// unspread?
// const garble = (...args) => join (',') (args)
// const garble = applyXXX (join (','))

// --- turn positional args into an array with those values.
var array = exports.array = function array() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
    }

    return args;
};

var garble1 = function garble1() {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
    }

    return (0, _ramda.join)(':')(args);
};
var garble2 = _op2(array, (0, _ramda.join)(':'));

var garble = garble2;

// the preposition refers to the identifier following.
//
// functions with an On ending are aliased to a version without it:
// call = callOn
// bind = bindOn
//
// functions with To and From endings have no aliases.
//

/*
if (this.startupCallback) {
    this.startupCallback();
}

this.startupCallback
| ifOk (callOn (this))

this.startupCallback
| ifOk (call (this))

ifOk__ (
    this.startupCallback,
    f => f.call (this),
)

ifOk__ (
    this.startupCallback,
    callOn (this),
)

ifOk__ (
    this.startupCallback,
    call (this),
)

ifOk__ (
    this.startupCallback,
    bind (this) >> call,
)

this.startupCallback
| ifOk (f => f.call (this))

'startupCallback'
| ifHasOn (this, call)

'startupCallback'
| ifBind (this, call)

invokeIfHas (this, 'startupCallback')
invoke1IfHas (this, 'startupCallback', 10)

ifBind (this, 'startupCallback', call)

*/

// inject?
// injectok
// injectwith
// mergeallin
// mergeallinwith
// okorerror
// existsorerror
// mapzip
// eachobjin
// eachobjindexed
// defaultto simple, func

var zipAll = exports.zipAll = function zipAll() {
    for (var _len5 = arguments.length, xss = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        xss[_key5] = arguments[_key5];
    }

    var ret = [];
    var l = xss[0].length;

    var _loop = function _loop(i) {
        var zip = _op(xss, (0, _ramda.map)(function (xs) {
            return xs[i];
        }));
        ret.push(zip);
    };

    for (var i = 0; i < l; i++) {
        _loop(i);
    }
    return ret;
};

// --- inject src into target, using only own vals.
var inject = (0, _ramda.curry)(function (src, target) {
    _op(src, (0, _ramda.forEachObjIndexed)(function (v, k) {
        return target[k] = v;
    }));
    return target;
});

var shallowClone = function shallowClone(obj) {
    return Object.assign({}, obj);
};

// --- like inject, but only if src val is ok.
var injectOk = (0, _ramda.curry)(function (src, target) {
    var _loop2 = function _loop2(i) {
        ifOk(function (x) {
            return target[i] = x;
        }, src[i]);
    };

    for (var i in src) {
        _loop2(i);
    }return target;
});

// --- like R.merge but also use prototype vals.
var mergeAllIn = exports.mergeAllIn = function mergeAllIn(xs) {
    return (0, _ramda.reduce)(function (target, mixin) {
        return inject(mixin, target);
    }, {}, xs);
};

var ifNot__ = function ifNot__(x, yes) {
    return x ? yes(x) : void 8;
};

var mergeFish = exports.mergeFish = function mergeFish(mixinsPre, proto, mixinsPost) {
    var reduceMixin = (0, _ramda.reduce)(function (a, b) {
        return _op(b, mergeTo(a));
    }, {});
    var pre = _op(mixinsPre, reduceMixin);
    var post = _op(mixinsPost, reduceMixin);
    _op(pre, (0, _ramda.forEachObjIndexed)(function (v, k) {
        return ifNot__((0, _ramda.hasIn)(k, proto), function () {
            return proto[k] = v;
        });
    }));
    _op(post, mergeToMut(proto));
    return proto;
};

var factory = exports.factory = function factory(proto) {
    var mixinsPre = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var mixinsPost = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    return laat([
    //         mergeAllIn (
    //             [...mixinsPre, shallowClone (proto), ...mixinsPost]
    //         )
    mergeFish(mixinsPre, proto, mixinsPost)], function (protoExtended) {
        return {
            proto: protoExtended,
            create: function create(instanceExtension) {
                return _op(_op(protoExtended, Object.create), injectOk(instanceExtension));
            }
        };
    });
};
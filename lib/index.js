#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.factory = exports.flattenPrototype = exports.discardPrototype = exports.ifXReplaceStrFlags = exports.ifXReplaceStr = exports.ifXReplace = exports.ifReplace = exports.xMatchStrFlags = exports.xMatchStr = exports.xMatch = exports.match = exports.xRegExpStr = exports.xRegExp = exports.nieuwN = exports.nieuw3 = exports.nieuw2 = exports.nieuw1 = exports.nieuw = exports.joinOk = exports.array = exports.compactOk = exports.compact = exports.times = exports.repeat = exports.zipAll = exports.noop = exports.sprintfN = exports.sprintf1 = exports.flipC = exports.applyN = exports.apply3 = exports.apply2 = exports.apply1 = exports.passN = exports.pass3 = exports.pass2 = exports.pass1 = exports.invoke = exports.callUnder2 = exports.callUnder1 = exports.callUnder = exports.callN = exports.call3 = exports.call2 = exports.call1 = exports.call = exports.callOnN = exports.callOn3 = exports.callOn2 = exports.callOn1 = exports.callOn = exports.laatStar = exports.givenStar = exports.laat = exports.given = undefined;
exports.passScalar = exports.applyScalar = exports.eachObjIn = exports.mapPairsIn = exports.mapPairs = exports.mergeAllIn = exports.mergeFromInMut = exports.mergeToInMut = exports.mergeFromIn = exports.mergeToIn = exports.injectFromMut = exports.injectToMut = exports.mergeFromWithMut = exports.mergeToWithMut = exports.mergeFromMut = exports.mergeToMut = exports.mergeFrom = exports.mergeTo = exports.concatFromMut = exports.concatToMut = exports.concatFrom = exports.concatTo = exports.prependToMut = exports.prependFromMut = exports.prependFrom = exports.prependTo = exports.appendFromMut = exports.appendToMut = exports.appendTo = exports.appendFrom = exports.assocMut = exports.defaultTo__ = exports.defaultTo = exports.bindLate = exports.bindTry = exports.bind = exports.cascade = exports.ifEmpty__ = exports.whenEmpty = exports.ifEmpty = exports.decorateException = exports.die = exports.raise = exports.exception = exports.tryCatch__ = exports.tryCatch = exports.cond = exports.ifLengthOne__ = exports.whenLengthOne = exports.ifLengthOne = exports.ifFunction__ = exports.whenFunction = exports.ifFunction = exports.ifNo__ = exports.whenNo = exports.ifNo = exports.ifYes__ = exports.whenYes = exports.ifYes = exports.ifFalse__ = exports.whenFalse = exports.ifFalse = exports.ifTrue__ = exports.whenTrue = exports.ifTrue = exports.ifOk__ = exports.whenOk = exports.ifOk = exports.ifCond__ = exports.whenCond = exports.ifCond = exports.tapDotNMut = exports.tapDot3Mut = exports.tapDot2Mut = exports.tapDot1Mut = exports.tapDotMut = exports.tapMut = exports.dotNMut = exports.dot3Mut = exports.dot2Mut = exports.dot1Mut = exports.dotMut = exports.tapDotN = exports.tapDot3 = exports.tapDot2 = exports.tapDot1 = exports.tapDot = exports.dotN = exports.dot3 = exports.dot2 = exports.dot1 = exports.dot = exports.ok = exports.bitwiseRightZeroFill = exports.bitwiseRight = exports.bitwiseLeft = exports.bitwiseNot = exports.bitwiseXor = exports.bitwiseOr = exports.bitwiseAnd = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ramda = require('ramda');

var _fishLib = require('fish-lib');

var _fishLib2 = _interopRequireDefault(_fishLib);

var _operator = require('./operator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// ramda map works on objs: keys same, values altered.
// could make an object mapper which lets you return pairs.
//
// Object.assign and {...} drop proto vals.

// pushTo for not mut would be a confusing name.

// [1 2 3] -> [4 5 6] -> [1 2 3 [4 5 6]]
// [] -> a -> []

// the preposition refers to the identifier following.
//
// functions with an On ending are aliased to a version without it:
// call = callOn
// bind = bindOn
//
// functions with To and From endings have no aliases.

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

// __ = not data-last, not curried

// ------ deps: noop, isFunction, ok

// --- strict evaluation of cond.
// --- not anaphoric unless param is baked into yes or no.
// --- doesn't seem useful to pass anything into the yes and no functions.
var ifCond = exports.ifCond = (0, _ramda.curry)(function (yes, no, cond) {
    return cond ? yes() : no();
});
var whenCond = exports.whenCond = (0, _ramda.curry)(function (yes, cond) {
    return _op(cond, ifCond(yes)(noop));
});
var ifCond__ = exports.ifCond__ = function ifCond__(cond, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(cond, ifCond(yes)(no));
};

//@todo export const ifNotOk = curry ((f, x) => ok (x) ? void 8 : f (x))

var ifOk = exports.ifOk = (0, _ramda.curry)(function (yes, no, x) {
    return ok(x) ? yes(x) : no(x);
});
var whenOk = exports.whenOk = (0, _ramda.curry)(function (yes, x) {
    return _op(x, ifOk(yes)(noop));
});
var ifOk__ = exports.ifOk__ = function ifOk__(x, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(x, ifOk(yes)(no));
};

var ifTrue = exports.ifTrue = (0, _ramda.curry)(function (yes, no, x) {
    return x === true ? yes(x) : no(x);
});
var whenTrue = exports.whenTrue = (0, _ramda.curry)(function (yes, x) {
    return _op(x, ifTrue(yes)(noop));
});
var ifTrue__ = exports.ifTrue__ = function ifTrue__(x, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(x, ifTrue(yes)(no));
};

var ifFalse = exports.ifFalse = (0, _ramda.curry)(function (yes, no, x) {
    return x === false ? yes(x) : no(x);
});
var whenFalse = exports.whenFalse = (0, _ramda.curry)(function (yes, x) {
    return _op(x, ifFalse(yes)(noop));
});
var ifFalse__ = exports.ifFalse__ = function ifFalse__(x, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(x, ifFalse(yes)(no));
};

var ifYes = exports.ifYes = (0, _ramda.curry)(function (yes, no, x) {
    return x ? yes(x) : no(x);
});
var whenYes = exports.whenYes = (0, _ramda.curry)(function (yes, x) {
    return _op(x, ifYes(yes)(noop));
});
var ifYes__ = exports.ifYes__ = function ifYes__(x, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(x, ifYes(yes)(no));
};

var ifNo = exports.ifNo = (0, _ramda.curry)(function (yes, no, x) {
    return !x ? yes(x) : no(x);
});
var whenNo = exports.whenNo = (0, _ramda.curry)(function (yes, x) {
    return _op(x, ifNo(yes)(noop));
});
var ifNo__ = exports.ifNo__ = function ifNo__(x, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(x, ifNo(yes)(no));
};

var ifFunction = exports.ifFunction = (0, _ramda.curry)(function (yes, no, x) {
    return isFunction(x) ? yes(x) : no(x);
});
var whenFunction = exports.whenFunction = (0, _ramda.curry)(function (yes, x) {
    return _op(x, ifFunction(yes)(noop));
});
var ifFunction__ = exports.ifFunction__ = function ifFunction__(x, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(x, ifFunction(yes)(no));
};

var ifLengthOne = exports.ifLengthOne = (0, _ramda.curry)(function (yes, no, xs) {
    return xs.length === 1 ? yes(xs) : no(xs);
});
var whenLengthOne = exports.whenLengthOne = (0, _ramda.curry)(function (yes, xs) {
    return _op(xs, ifLengthOne(yes)(noop));
});
var ifLengthOne__ = exports.ifLengthOne__ = function ifLengthOne__(xs, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(xs, ifLengthOne(yes)(no));
};

// --- last one always? undef if none?
// tests for truthINEss, so it acts like if().
var cond = exports.cond = (0, _ramda.curry)(function (blocks, target) {
    var result = void 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = blocks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2),
                test = _step$value[0],
                exec = _step$value[1];

            if (!ok(test)) return exec(target);

            var _result = test(target);
            if (_result) return exec(_result);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
});

// ------ exceptions.

var tryCatch = exports.tryCatch = (0, _ramda.curry)(function (good, bad, f) {
    try {
        return good(f());
    } catch (e) {
        return bad(e);
    }
});

var tryCatch__ = exports.tryCatch__ = function tryCatch__(whatToTry) {
    var howToCatch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

    try {
        return whatToTry();
    } catch (e) {
        return howToCatch(e);
    }
};

var exception = exports.exception = function exception() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return new Error(_op(args, (0, _ramda.join)(' ')));
};
var raise = exports.raise = function raise(e) {
    throw e;
};
var die = exports.die = function die() {
    return _op(exception.apply(undefined, arguments), raise);
};
var decorateException = exports.decorateException = (0, _ramda.curry)(function (prefix, e) {
    return _op(e, assocMut('message', joinOk(' ')([prefix, e.message])));
});

// @todo
var ifArray = (0, _ramda.curry)(function (yes, no, x) {
    return isArray(x) ? yes(x) : no(x);
});
var ifZero = (0, _ramda.curry)(function (yes, no, x) {
    return x === 0 ? yes(x) : no(x);
});
var whenZero = (0, _ramda.curry)(function (yes, x) {
    return _op(x, ifZero(yes)(noop));
});
var ifZero__ = function ifZero__(x, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(x, ifZero(yes)(no));
};
var ifOne = (0, _ramda.curry)(function (yes, no, x) {
    return x === 1 ? yes(x) : no(x);
});
var whenOne = (0, _ramda.curry)(function (yes, x) {
    return _op(x, ifOne(yes)(noop));
});
var ifOne__ = function ifOne__(x, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(x, ifOne(yes)(no));
};

var ifEmpty = exports.ifEmpty = (0, _ramda.curry)(function (yes, no, xs) {
    return xs.length === 0 ? yes(xs) : no(xs);
});
var whenEmpty = exports.whenEmpty = (0, _ramda.curry)(function (yes, xs) {
    return _op(xs, ifEmpty(yes)(noop));
});
var ifEmpty__ = exports.ifEmpty__ = function ifEmpty__(xs, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(xs, ifEmpty(yes)(no));
};

// --@todo: cond battery from wiris script.

// ------ cascade

var cascade = exports.cascade = function cascade(val) {
    for (var _len2 = arguments.length, fxs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        fxs[_key2 - 1] = arguments[_key2];
    }

    return _op(fxs, (0, _ramda.reduce)(function (a, b) {
        return b(a);
    }, val));
};

// ------ bind

// --- dies if o[prop] is not a function.
var bind = exports.bind = (0, _ramda.curry)(function (o, prop) {
    return o[prop].bind(o);
});

// --- returns undefined if o[prop] is not a function.
var bindTry = exports.bindTry = (0, _ramda.curry)(function (o, prop) {
    return _op(o[prop], whenFunction(function () {
        return bind(o, prop);
    }));
});

// --- returns a function representing the 'result' of the bind: doesn't actually try to bind until
// that function is invoked.
var bindLate = exports.bindLate = (0, _ramda.curry)(function (o, key) {
    return function () {
        return o[key].apply(o, arguments);
    };
});

// --------- data.

// ------ defaultTo.

// --- f is a *function*.
var defaultTo = exports.defaultTo = (0, _ramda.curry)(function (f, x) {
    return ok(x) ? x : f();
});
var defaultTo__ = exports.defaultTo__ = function defaultTo__(x, f) {
    return _op(x, defaultTo(f));
};

// ------ assoc.

var assocMut = exports.assocMut = (0, _ramda.curry)(function (prop, val, o) {
    return o[prop] = val, o;
});

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

// --- discards non-own on src.
// --- does not discard non-own on tgt, b/c mut.
// --- uses collision function if key exists in the target, anywhere in target's prototype chain.
// --- 'with' refers to collision
// --- 'to' refers to tgt
// --- if a collision occurs in the target's prototype chain, the value will surface, regardless of
// whether src or tgt version is chosen.

var mergeToWithMut = exports.mergeToWithMut = (0, _ramda.curry)(function (collision, tgt, src) {
    var ret = tgt;
    for (var i in src) {
        if ((0, _ramda.has)(i, src)) {
            if ((0, _ramda.hasIn)(i, ret)) ret[i] = collision(tgt[i], src[i]);else ret[i] = src[i];
        }
    }return ret;
});

var mergeFromWithMut = exports.mergeFromWithMut = (0, _ramda.curry)(function (collision, src, tgt) {
    return mergeToWithMut(collision, tgt, src);
});

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

// --- like R.mergeAll but also use prototype vals.
// --- to and from not applicable, also not curried or meant to be used piped.
var mergeAllIn = exports.mergeAllIn = function mergeAllIn(xs) {
    return _op(xs, (0, _ramda.reduce)(function (target, source) {
        return _op(source, mergeToInMut(target));
    }, {}));
};

// ------ map.

// --- user function f is expected to return pairs: [k, v]
//
// if target is an obj, it maps on key/value pairs of object.
// if target is an array [key, value, key, value], it maps on pairs (think %foo= @foo in perl)
//
// ordering: k, v.
// everywhere else: v, k.

var mapPairs = exports.mapPairs = (0, _ramda.curry)(function (f, obj) {
    return _op(obj, ifArray(_op2(_op2((0, _ramda.splitEvery)(2), (0, _ramda.map)(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        return f(k, v);
    })), _ramda.fromPairs), _op2(_op2(_ramda.toPairs, (0, _ramda.map)(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            k = _ref4[0],
            v = _ref4[1];

        return f(k, v);
    })), _ramda.fromPairs)));
});

// --- doesn't take array, only obj.
var mapPairsIn = exports.mapPairsIn = (0, _ramda.curry)(function (f, obj) {
    return _op(_op(_op(obj, _ramda.toPairsIn), (0, _ramda.map)(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            k = _ref6[0],
            v = _ref6[1];

        return f(k, v);
    })), _ramda.fromPairs);
});

// --- ramda already gives us eachObj.

var eachObjIn = exports.eachObjIn = (0, _ramda.curry)(function (f, obj) {
    for (var k in obj) {
        f(obj[k], k);
    }
});

// [a -> b] -> [a] -> [b]
var applyScalar = exports.applyScalar = (0, _ramda.curry)(function (fs, xs) {
    return _op(_op(xs, (0, _ramda.zip)(fs)), (0, _ramda.map)(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
            f = _ref8[0],
            x = _ref8[1];

        return f(x);
    }));
});

var passScalar = exports.passScalar = (0, _ramda.flip)(applyScalar);

// --------- given/laat

var given = exports.given = function given(xs, f) {
    return f.apply(null, xs);
};
var laat = exports.laat = given;

// note that f is optional: the last function in xs serves the same purpose, but it can be used for
// symmetry with laat.

var givenStar = exports.givenStar = function givenStar(xs, f) {
    var xsMapper = function xsMapper(prevVals) {
        return ifFunction(function (v) {
            return v.apply(null, prevVals);
        }, function (v) {
            return v;
        });
    };

    var ys = _op(_op(xs
    // --- acc contains running output array, up to the previous item.
    , (0, _ramda.mapAccum)(function (acc, v) {
        return _op(xsMapper(acc)(v), function (mapped) {
            return [[].concat(_toConsumableArray(acc), [mapped]), mapped];
        });
    }, [])), (0, _ramda.prop)(1));

    return f ? f.apply(null, ys) : (0, _ramda.last)(ys);
};

var laatStar = exports.laatStar = givenStar;

// --- 'call' always means pass a context.
// --- 'apply' always means 'apply this function to some params'
// --- 'pass' means 'pass these params to a function'
// --- 'invoke' means just call this function, no context or params.

// log | invokeN ([1, 2, 3])
// log | passN ([1, 2, 3])

// log | invokeUsingN ([1, 2, 3])
// call them invoke using?

// [1, 2, 3] | apply (log)
//
// point-free of x => x.apply (null, xs)
// where x is a function,
// is not called apply.
// passN (xs)
// ([1, 2, 3]) | passOn (log)

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

var invoke = exports.invoke = function invoke(f) {
    return f();
};

var pass1 = exports.pass1 = (0, _ramda.curry)(function (val, f) {
    return f(val);
});
var pass2 = exports.pass2 = (0, _ramda.curry)(function (val1, val2, f) {
    return f(val1, val2);
});
var pass3 = exports.pass3 = (0, _ramda.curry)(function (val1, val2, val3, f) {
    return f(val1, val2, val3);
});
var passN = exports.passN = (0, _ramda.curry)(function (vs, f) {
    return f.apply(null, vs);
});

var apply1 = exports.apply1 = (0, _ramda.curry)(function (f, val) {
    return f(val);
});
var apply2 = exports.apply2 = (0, _ramda.curry)(function (f, val1, val2) {
    return f(val1, val2);
});
var apply3 = exports.apply3 = (0, _ramda.curry)(function (f, val1, val2, val3) {
    return f(val1, val2, val3);
});
var applyN = exports.applyN = (0, _ramda.curry)(function (f, vs) {
    return f.apply(null, vs);
});

// --- flip first and second args: also works for functions curried with the a => b => ... notation.
// outer curry not needed??
// and how can the inner curry work with rest params?
var flipC = exports.flipC = (0, _ramda.curry)(function (f) {
    return (0, _ramda.curry)(function (a, b) {
        for (var _len3 = arguments.length, rest = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
            rest[_key3 - 2] = arguments[_key3];
        }

        return laat([f(b)(a)], function (interimResult) {
            return rest.length === 0 ? interimResult : _op(rest, (0, _ramda.reduce)(function (a, b) {
                return a(b);
            }, interimResult));
        });
    });
});

// ------ sprintf

var sprintf1 = exports.sprintf1 = (0, _ramda.curry)(function (str, a) {
    return (0, _fishLib.sprintf)(str, a);
});
var sprintfN = exports.sprintfN = (0, _ramda.curry)(function (str, xs) {
    return _fishLib.sprintf.apply(null, [str].concat(_toConsumableArray(xs)));
});

var noop = exports.noop = function noop() {};

// --- r's zip only takes two.
var zipAll = exports.zipAll = function zipAll() {
    for (var _len4 = arguments.length, xss = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        xss[_key4] = arguments[_key4];
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

// --------- list.

var repeat = exports.repeat = (0, _ramda.flip)(_ramda.repeat);
var times = exports.times = (0, _ramda.flip)(_ramda.times);

var compact = exports.compact = (0, _ramda.filter)(Boolean);
var compactOk = exports.compactOk = (0, _ramda.reject)(_ramda.isNil);

// --- turn positional args into an array with those values.
var array = exports.array = function array() {
    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
    }

    return args;
};

var joinOk = exports.joinOk = (0, _ramda.curry)(function (j, xs) {
    return _op(_op(xs, compactOk), (0, _ramda.join)(j));
});

// --------- new.

var nieuw = exports.nieuw = function nieuw(x) {
    return new x();
};
var nieuw1 = exports.nieuw1 = (0, _ramda.curry)(function (x, val) {
    return new x(val);
});
var nieuw2 = exports.nieuw2 = (0, _ramda.curry)(function (x, val1, val2) {
    return new x(val1, val2);
});
var nieuw3 = exports.nieuw3 = (0, _ramda.curry)(function (x, val1, val2, val3) {
    return new x(val1, val2, val3);
});
var nieuwN = exports.nieuwN = (0, _ramda.curry)(function (x, vs) {
    return new (Function.prototype.bind.apply(x, [null].concat(_toConsumableArray(vs))))();
});

// --------- regex.
// @deps: dot1

// --- leaving out the 'flip' versions: assuming you generally want to pipe the target to the match
// functions.

var removeSpaces = dot2('replace')(/\s+/g)('');

// --- input: regex.
var xRegExp = exports.xRegExp = function xRegExp(re) {
    return new RegExp(_op(re.source, removeSpaces), re.flags);
};

// --- input: string, [string].
var xRegExpStr = exports.xRegExpStr = function xRegExpStr(reStr) {
    var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    return laat([_op(reStr, removeSpaces), flags], nieuw2(RegExp));
};

var match = exports.match = (0, _ramda.curry)(function (re, target) {
    return re.exec(target);
});

// --- input: regex.
var xMatch = exports.xMatch = (0, _ramda.curry)(function (re, target) {
    return _op(xRegExp(re), dot1('exec', target));
});

// --- input: string.
var xMatchStr = exports.xMatchStr = (0, _ramda.curry)(function (reStr, target) {
    return _op(target, xMatch(new RegExp(reStr)));
});

// --- input: string, string.
var xMatchStrFlags = exports.xMatchStrFlags = (0, _ramda.curry)(function (reStr, flags, target) {
    return _op(target, xMatch(new RegExp(reStr, flags)));
});

// --- @todo
// xReplace
// xReplace should tell how many it replaced.
// perhaps when global it should return an object.
// xReplaceStr
// xReplaceStrFlags

var ifReplace = exports.ifReplace = (0, _ramda.curry)(function (yes, no, re, repl, target) {
    var success = 0;
    var out = target.replace(re, function () {
        ++success;
        return repl;
    });
    return _op(success, ifYes(function () {
        return yes(out, success);
    }, function () {
        return no(target);
    }));
});

var ifXReplace = exports.ifXReplace = (0, _ramda.curry)(function (yes, no, re, repl, target) {
    return ifReplace(yes, no, _op(re, xRegExp), repl, target);
});

var ifXReplaceStr = exports.ifXReplaceStr = (0, _ramda.curry)(function (yes, no, reStr, repl, target) {
    return ifReplace(yes, no, xRegExpStr(reStr), repl, target);
});

var ifXReplaceStrFlags = exports.ifXReplaceStrFlags = (0, _ramda.curry)(function (yes, no, reStr, flags, repl, target) {
    return ifReplace(yes, no, xRegExpStr(reStr, flags), repl, target);
});

// --- returns a copy with prototype vals discarded.
var discardPrototype = exports.discardPrototype = function discardPrototype(o) {
    return Object.assign({}, o);
};

var flattenPrototype = exports.flattenPrototype = function flattenPrototype(o) {
    var ret = {};
    for (var i in o) {
        ret[i] = o[i];
    }return ret;
};

var arg0 = function arg0() {
    return arguments.length <= 0 ? undefined : arguments[0];
};
var arg1 = function arg1() {
    return arguments.length <= 1 ? undefined : arguments[1];
};

var mergeMixins = function mergeMixins(mixinsPre, proto, mixinsPost) {
    var reduceMixins = (0, _ramda.reduce)(function (a, b) {
        return _op(b, mergeTo(a));
    }, {});
    var pre = _op(mixinsPre, reduceMixins);
    var post = _op(mixinsPost, reduceMixins);
    var chooseTarget = arg0;

    _op(pre, mergeToWithMut(chooseTarget)(proto));
    _op(post, mergeToMut(proto));

    return proto;
};

var factory = exports.factory = function factory(proto) {
    var mixinsPre = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var mixinsPost = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    return laat([mergeMixins(mixinsPre, proto, mixinsPost)], function (protoExtended) {
        return {
            proto: protoExtended,
            create: function create(instanceExtension) {
                return _op(_op(protoExtended, Object.create), mergeFromInMut(instanceExtension));
            }
        };
    });
};

/*
 * could make the flattening proto stuff configurable
 *
 * if you want the opposite:
 *
 * // on:
 * o
 * | discardPrototype
 * | merge (p)
 *
 * // off:
 * o
 * | flattenPrototype
 * | merge (p)
 *
 *
 *
 *
 *
// tests for truthINEss
export const cond = curry ((blocks, target) => {
    let result
    for (const [test, exec] of blocks) {
        if (!ok (test)) return exec (target)

        const result = test (target)
        if (result) return exec (result)
    }
})









*/

// --- wants upper case, e.g. output of toString.
var isType = (0, _ramda.curry)(function (t, x) {
    return _op(_op(_op(x, callUnder({}.toString)), dot2('slice')(8, -1)), (0, _ramda.equals)(t));
});
var isArray = isType('Array');
var isFunction = isType('Function');

// --- map indexed: not sure about exporting these.
var mapIndexed = (0, _ramda.addIndex)(_ramda.map);
var mapAccumIndexed = (0, _ramda.addIndex)(_ramda.mapAccum);

// @todo
// okorerror
// existsorerror
// injectok
// injectwith
// update would be good

//cond like in cond-> clojure macro.
//x | cond ([ ... anaphoric functions ])


// bind needs flip family as well.
// 'speak' | bind-to obj
// obj | bind-under 'speak'
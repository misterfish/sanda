'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.blush = exports.ne = undefined;
exports.eq = exports.lte = exports.lt = exports.gte = exports.gt = exports.ifEquals__ = exports.whenEquals = exports.ifEquals = exports.otherwise = exports.guard = exports.condPredicate = exports.condEquals = exports.condElse = exports.laatStarDat = exports.laatDat = exports.factory = exports.flattenPrototype = exports.discardPrototype = exports.ifXReplaceStrFlags = exports.ifXReplaceStr = exports.ifXReplace = exports.ifReplace = exports.xReplaceStrFlags = exports.xReplaceStr = exports.xReplace = exports.xMatchStrFlags = exports.xMatchStr = exports.xMatch = exports.match = exports.xRegExpStr = exports.xRegExp = exports.nieuwN = exports.nieuw3 = exports.nieuw2 = exports.nieuw1 = exports.nieuw = exports.joinOk = exports.array = exports.compactOk = exports.compact = exports.rangeBy = exports.times = exports.repeat = exports.zipAll = exports.noop = exports.sprintfN = exports.sprintf1 = exports.flipC = exports.applyN = exports.apply3 = exports.apply2 = exports.apply1 = exports.passN = exports.pass3 = exports.pass2 = exports.pass1 = exports.invoke = exports.callUnder2 = exports.callUnder1 = exports.callUnder = exports.callN = exports.call3 = exports.call2 = exports.call1 = exports.call = exports.callOnN = exports.callOn3 = exports.callOn2 = exports.callOn1 = exports.callOn = exports.laatStar = exports.givenStar = exports.laat = exports.given = exports.scalarPass = exports.scalarApply = exports.passScalar = exports.applyScalar = exports.eachObjIn = exports.mapPairsIn = exports.mapPairs = exports.mergeAllIn = exports.mergeFromInMut = exports.mergeToInMut = exports.mergeFromIn = exports.mergeToIn = exports.injectFromMut = exports.injectToMut = exports.mergeFromWithMut = exports.mergeToWithMut = exports.mergeFromMut = exports.mergeToMut = exports.mergeFrom = exports.mergeTo = exports.concatFromMut = exports.concatToMut = exports.concatFrom = exports.concatTo = exports.prependToMut = exports.prependFromMut = undefined;
exports.prependFrom = exports.prependTo = exports.appendFromMut = exports.appendToMut = exports.appendTo = exports.appendFrom = exports.assocMut = exports.defaultTo__ = exports.defaultTo = exports.bindLate = exports.bindTry = exports.bind = exports.cascade = exports.ifPredicate__ = exports.whenPredicate = exports.ifPredicate = exports.ifEmpty__ = exports.whenEmpty = exports.ifEmpty = exports.ifOne__ = exports.whenOne = exports.ifOne = exports.ifZero__ = exports.whenZero = exports.ifZero = exports.ifArray = exports.decorateException = exports.die = exports.raise = exports.exception = exports.tryCatch__ = exports.tryCatch = exports.cond = exports.ifBind__ = exports.whenBind = exports.ifBind = exports.ifHasIn__ = exports.whenHasIn = exports.ifHasIn = exports.ifHas__ = exports.whenHas = exports.ifHas = exports.ifLengthOne__ = exports.whenLengthOne = exports.ifLengthOne = exports.ifFunction__ = exports.whenFunction = exports.ifFunction = exports.ifNo__ = exports.whenNo = exports.ifNo = exports.ifYes__ = exports.whenYes = exports.ifYes = exports.ifFalse__ = exports.whenFalse = exports.ifFalse = exports.ifTrue__ = exports.whenTrue = exports.ifTrue = exports.ifNotOk__ = exports.whenNotOk = exports.ifNotOk = exports.ifOk__ = exports.whenOk = exports.ifOk = exports.tapDotNMut = exports.tapDot3Mut = exports.tapDot2Mut = exports.tapDot1Mut = exports.tapDotMut = exports.tapMut = exports.dot4Mut = exports.dot6 = exports.dot5 = exports.dot4 = exports.dotNMut = exports.dot3Mut = exports.dot2Mut = exports.dot1Mut = exports.dotMut = exports.tapDotN = exports.tapDot3 = exports.tapDot2 = exports.tapDot1 = exports.tapDot = exports.dotN = exports.dot3 = exports.dot2 = exports.dot1 = exports.dot = exports.ok = exports.doe = exports.bitwiseRightZeroFill = exports.bitwiseRight = exports.bitwiseLeft = exports.bitwiseNot = exports.bitwiseXor = exports.bitwiseOr = exports.bitwiseAnd = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ramda = require('ramda');

var _sprintf = require('sprintf');

var _sprintf2 = _interopRequireDefault(_sprintf);

var _operator = require('./operator');

var _monad = require('./monad');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// ramda map works on objs: keys same, values altered.
// could make an object mapper which lets you return pairs.
//
// Object.assign and {...} drop proto vals.

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

var _op2 = (0, _ramda.curry)(function (a, b) {
    return (0, _ramda.compose)(b, a);
});

var _op3 = (0, _ramda.curry)(function (a, b) {
    return (0, _ramda.compose)(a, b);
});

exports.bitwiseAnd = _operator.bitwiseAnd;
exports.bitwiseOr = _operator.bitwiseOr;
exports.bitwiseXor = _operator.bitwiseXor;
exports.bitwiseNot = _operator.bitwiseNot;
exports.bitwiseLeft = _operator.bitwiseLeft;
exports.bitwiseRight = _operator.bitwiseRight;
exports.bitwiseRightZeroFill = _operator.bitwiseRightZeroFill;
exports.doe = _monad.doe;
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

// @todo
var dot4 = exports.dot4 = (0, _ramda.curry)(function (prop, val1, val2, val3, val4, o) {
    return o[prop](val1, val2, val3, val4);
});
var dot5 = exports.dot5 = (0, _ramda.curry)(function (prop, val1, val2, val3, val4, val5, o) {
    return o[prop](val1, val2, val3, val4, val5);
});
var dot6 = exports.dot6 = (0, _ramda.curry)(function (prop, val1, val2, val3, val4, val5, val6, o) {
    return o[prop](val1, val2, val3, val4, val5, val6);
});
var dot4Mut = exports.dot4Mut = dot3;

var tapMut = exports.tapMut = _ramda.tap;
var tapDotMut = exports.tapDotMut = tapDot;
var tapDot1Mut = exports.tapDot1Mut = tapDot1;
var tapDot2Mut = exports.tapDot2Mut = tapDot2;
var tapDot3Mut = exports.tapDot3Mut = tapDot3;
var tapDotNMut = exports.tapDotNMut = tapDotN;

// __ = not data-last, not curried

// ------ deps: noop, isFunction, ok

// ------ useless, same as ifYes.
// --- strict evaluation of cond.
// --- not anaphoric unless param is baked into yes or no.
// --- doesn't seem useful to pass anything into the yes and no functions.
// --- for anaphoric, see cond.
// export const ifCond = curry ((yes, no, cond) => cond ? yes () : no ())
// export const whenCond = curry ((yes, cond) => cond | ifCond (yes) (noop))
// export const ifCond__ = (cond, yes, no = noop) => cond | ifCond (yes) (no)

// @todo need something like
// when (isTTY, stdin => ...)
// stdin | whenPredicate (isTTY, stdin => ...)
//
// doesn't work
// stdin.setRawMode | whenFunction (pass1 (bool))
// stdin.bindTry ('setRawMode') | whenFunction (pass1 (bool))
// --- this is horrible.
// bool => tap (stdin => 'setRawMode' | bindTry (stdin) | whenFunction (pass1 (bool))),
// @todo whenBind? whenCan?

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

// @todo
var ifNotOk = exports.ifNotOk = (0, _ramda.curry)(function (yes, no, x) {
    return (0, _ramda.isNil)(x) ? yes(x) : no(x);
});
var whenNotOk = exports.whenNotOk = (0, _ramda.curry)(function (yes, x) {
    return _op(x, ifNotOk(yes)(noop));
});
var ifNotOk__ = exports.ifNotOk__ = function ifNotOk__(x, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(x, ifNotOk(yes)(no));
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

// @todo test
var ifHas = exports.ifHas = (0, _ramda.curry)(function (yes, no, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        o = _ref2[0],
        k = _ref2[1];

    return _op(o, (0, _ramda.has)(k)) ? yes(o[k], o, k) : no(o, k);
});
var whenHas = exports.whenHas = (0, _ramda.curry)(function (yes, spec) {
    return _op(spec, ifHas(yes)(noop));
});
var ifHas__ = exports.ifHas__ = function ifHas__(spec, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(spec, ifHas(yes)(no));
};

// @todo test
var ifHasIn = exports.ifHasIn = (0, _ramda.curry)(function (yes, no, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        o = _ref4[0],
        k = _ref4[1];

    return _op(o, (0, _ramda.hasIn)(k)) ? yes(o[k], o, k) : no(o, k);
});
var whenHasIn = exports.whenHasIn = (0, _ramda.curry)(function (yes, spec) {
    return _op(spec, ifHasIn(yes)(noop));
});
var ifHasIn__ = exports.ifHasIn__ = function ifHasIn__(spec, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(spec, ifHasIn(yes)(no));
};

// @todo test
var ifBind = exports.ifBind = (0, _ramda.curry)(function (yes, no, _ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        o = _ref6[0],
        k = _ref6[1];

    return laat([_op(k, bindTry(o))], ifOk(yes, no));
});
var whenBind = exports.whenBind = (0, _ramda.curry)(function (yes, spec) {
    return _op(spec, ifBind(yes)(noop));
});
var ifBind__ = exports.ifBind__ = function ifBind__(spec, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(spec, ifBind(yes)(no));
};

// --- last one always? undef if none?
// tests for truthINEss, so it acts like if().
// export const cond = curry ((blocks, target) => {
//     let result
//     for (const [test, exec] of blocks) {
//         if (!ok (test)) return exec (target)
//
//         const result = test (target)
// 		// @todo test.
//         // this order for symmetry with null case.
//         if (result) return exec (target, result)
//     }
// })

// need version with no target xx
var cond = exports.cond = (0, _ramda.curry)(function (blocks, target) {
    var result = void 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        var _loop = function _loop() {
            var _step$value = _slicedToArray(_step.value, 2),
                a = _step$value[0],
                b = _step$value[1];

            var _ref7 = _op(b, ifOk(function () {
                return [a, b];
            }, function () {
                return [null, a];
            })),
                _ref8 = _slicedToArray(_ref7, 2),
                test = _ref8[0],
                exec = _ref8[1];

            if (!ok(test)) return {
                    v: exec(target)
                };

            var result = test(target);
            // @todo test.
            // this order for symmetry with null case.
            if (result) return {
                    v: exec(target, result)
                };
        };

        for (var _iterator = blocks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ret = _loop();

            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
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

// @todo was buggy, changed
var tryCatch = exports.tryCatch = (0, _ramda.curry)(function (good, bad, f) {
    var successVal = void 0;
    try {
        successVal = f();
    } catch (e) {
        return bad(e);
    }
    return good(successVal);
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

// @ might be good if __ versions don't call the curried versions, because it messes up TCO.

// @todo
var ifArray = exports.ifArray = (0, _ramda.curry)(function (yes, no, x) {
    return isArray(x) ? yes(x) : no(x);
});

var ifZero = exports.ifZero = (0, _ramda.curry)(function (yes, no, x) {
    return x === 0 ? yes(x) : no(x);
});
var whenZero = exports.whenZero = (0, _ramda.curry)(function (yes, x) {
    return _op(x, ifZero(yes)(noop));
});
var ifZero__ = exports.ifZero__ = function ifZero__(x, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(x, ifZero(yes)(no));
};
var ifOne = exports.ifOne = (0, _ramda.curry)(function (yes, no, x) {
    return x === 1 ? yes(x) : no(x);
});
var whenOne = exports.whenOne = (0, _ramda.curry)(function (yes, x) {
    return _op(x, ifOne(yes)(noop));
});
var ifOne__ = exports.ifOne__ = function ifOne__(x, yes) {
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

// --- tests for exact truth. better truthy? @todo
var ifPredicate = exports.ifPredicate = (0, _ramda.curry)(function (f, yes, no, x) {
    return f(x) === true ? yes(x) : no(x);
});
var whenPredicate = exports.whenPredicate = (0, _ramda.curry)(function (f, yes, x) {
    return _op(x, ifPredicate(f)(yes)(noop));
});
var ifPredicate__ = exports.ifPredicate__ = function ifPredicate__(f, x, yes) {
    var no = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;
    return _op(x, ifPredicate(f)(yes)(no));
};

// @todo
// alias ifEmpty -> isLengthOne
//
// @todo
// isLeft, isRight, isSome, isNone,

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

var pushTo = appendToMut;

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
// @todo: alias precatFrom
var concatTo = exports.concatTo = _ramda.concat;

// @todo: alias precatTo
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
        _op([src, i], whenHas(function (v, o, k) {
            return ret[k] = v;
        }));
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

    var _loop2 = function _loop2(i) {
        _op([src, i], whenHas(function (v, o, k) {
            _op([ret, i], ifHasIn(function (v, o, k) {
                return ret[i] = collision(ret[i], src[i]);
            }, function (o, k) {
                return ret[i] = src[i];
            }));
        }));
    };

    for (var i in src) {
        _loop2(i);
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
    return _op(obj, ifArray(_op2(_op2((0, _ramda.splitEvery)(2), (0, _ramda.map)(function (_ref9) {
        var _ref10 = _slicedToArray(_ref9, 2),
            k = _ref10[0],
            v = _ref10[1];

        return f(k, v);
    })), _ramda.fromPairs), _op2(_op2(_ramda.toPairs, (0, _ramda.map)(function (_ref11) {
        var _ref12 = _slicedToArray(_ref11, 2),
            k = _ref12[0],
            v = _ref12[1];

        return f(k, v);
    })), _ramda.fromPairs)));
});

// --- doesn't take array, only obj.
var mapPairsIn = exports.mapPairsIn = (0, _ramda.curry)(function (f, obj) {
    return _op(_op(_op(obj, _ramda.toPairsIn), (0, _ramda.map)(function (_ref13) {
        var _ref14 = _slicedToArray(_ref13, 2),
            k = _ref14[0],
            v = _ref14[1];

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
    return _op(_op(xs, (0, _ramda.zip)(fs)), (0, _ramda.map)(function (_ref15) {
        var _ref16 = _slicedToArray(_ref15, 2),
            f = _ref16[0],
            x = _ref16[1];

        return f(x);
    }));
});

var passScalar = exports.passScalar = (0, _ramda.flip)(applyScalar);

// @todo
var scalarApply = exports.scalarApply = applyScalar;
var scalarPass = exports.scalarPass = passScalar;

// --------- given/laat

var given = exports.given = function given(xs, f) {
    return f.apply(null, xs);
};
var laat = exports.laat = given;

// note that f is optional: the last function in xs serves the same purpose, but it can be used for
// symmetry with laat.

var givenStar = exports.givenStar = function givenStar() {
    for (var _len3 = arguments.length, xs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        xs[_key3] = arguments[_key3];
    }

    var executeStep = function executeStep(prevVals) {
        return passN(prevVals);
    };

    var ys = _op(_op(xs
    // --- acc contains running output array, up to the previous item.
    , (0, _ramda.mapAccum)(function (acc, v) {
        return _op(executeStep(acc)(v), function (stepVal) {
            return [[].concat(_toConsumableArray(acc), [stepVal]), stepVal];
        });
    })([])), (0, _ramda.prop)(1));

    return _op(ys, _ramda.last);
};

var laatStar = exports.laatStar = givenStar;

// --- 'call' always means pass a context.
// --- 'apply' always means 'apply this function to some params'
// --- 'pass' means 'pass these params to a function'
// --- 'invoke' means just call this function, no context or params.

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

// --- flip first and second args of a curried function, even for functions with more than 2 args.
// --- also works for functions curried with the a => b => ... notation (unlike R.flip).
// --- does not work with non-curried functions.

var flipC = exports.flipC = function flipC(f) {
    return (0, _ramda.curryN)(2)(function (a, b) {
        for (var _len4 = arguments.length, rest = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
            rest[_key4 - 2] = arguments[_key4];
        }

        return laat(
        // --- if f had arity 2, f (b) (a) is the answer; otherwise it's a curried interim result,
        // since f itself was curried.
        [f(b)(a)], function (interimResult) {
            return _op(rest, ifEmpty(function () {
                return interimResult;
            }, (0, _ramda.reduce)(function (a, b) {
                return a(b);
            })(interimResult)));
        });
    });
};

// ------ sprintf

var sprintf1 = exports.sprintf1 = (0, _ramda.curry)(function (str, a) {
    return (0, _sprintf2.default)(str, a);
});
var sprintfN = exports.sprintfN = (0, _ramda.curry)(function (str, xs) {
    return _sprintf2.default.apply(null, [str].concat(_toConsumableArray(xs)));
});

var noop = exports.noop = function noop() {};

// --- r's zip only takes two.
// @dep appendToMut
var zipAll = exports.zipAll = function zipAll() {
    for (var _len5 = arguments.length, xss = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        xss[_key5] = arguments[_key5];
    }

    var ret = [];
    var l = xss[0].length;

    var _loop3 = function _loop3(i) {
        _op(_op(xss, (0, _ramda.map)(function (xs) {
            return xs[i];
        })), pushTo(ret));
    };

    for (var i = 0; i < l; i++) {
        _loop3(i);
    }return ret;
};

// --------- list.

// multiple versions with preps ??
var repeat = exports.repeat = (0, _ramda.flip)(_ramda.repeat);
var times = exports.times = (0, _ramda.flip)(_ramda.times);

// @todo
// export const rangeBy = curry ((from, to, by, f) => {
//     for (let i = from; i <= to; i += by) f (i)
// })
// export const range = curry ((from, to, f) => rangeBy (from, to, 1, f))

// excl, so it's like ramda.
// they already provide range.
var rangeBy = exports.rangeBy = (0, _ramda.curry)(function (from, to, by) {
    var coll = [];
    for (var i = from; i < to; i += by) {
        coll.push(i);
    }return coll;
});

var compact = exports.compact = (0, _ramda.filter)(Boolean);
var compactOk = exports.compactOk = (0, _ramda.reject)(_ramda.isNil);

// --- turn positional args into an array with those values.
var array = exports.array = function array() {
    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
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

var xReplace = exports.xReplace = (0, _ramda.curry)(function (re, repl, target) {
    return target.replace(xRegExp(re), repl);
});

var xReplaceStr = exports.xReplaceStr = (0, _ramda.curry)(function (reStr, repl, target) {
    return target.replace(xRegExpStr(reStr), repl);
});

var xReplaceStrFlags = exports.xReplaceStrFlags = (0, _ramda.curry)(function (reStr, flags, repl, target) {
    return target.replace(xRegExpStr(reStr, flags), repl);
});

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

// --- returns a copy with prototype vals floated.
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
    })({});
    var pre = _op(mixinsPre, reduceMixins);
    var post = _op(mixinsPost, reduceMixins);
    var chooseTarget = arg0;

    _op(pre, mergeToWithMut(chooseTarget)(proto));
    _op(post, mergeToMut(proto));

    return proto;
};

// --- providing mixins will *alter* proto -- this is to avoid doing a clone or flattening the
// prototype chain.
// --- you can avoid this by passing Object.create (proto) instead of proto.
// --- probably if you are working with mixins you don't mind if the proto is altered, just saying.

// --- multiple instanceExtensions can be given: will be merged right-to-left using R.mergeAll,
// meaning prototypes will be discarded.

var factory = exports.factory = function factory(proto) {
    var mixinsPre = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var mixinsPost = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    return laat([mergeMixins(mixinsPre, proto, mixinsPost)], function (protoExtended) {
        return {
            proto: protoExtended,
            create: function create() {
                for (var _len7 = arguments.length, instanceExtension = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                    instanceExtension[_key7] = arguments[_key7];
                }

                return _op(_op(protoExtended, Object.create), mergeFromInMut(_op(instanceExtension, _ramda.mergeAll)));
            }
        };
    });
};

// --- wants upper case, e.g. output of toString.
var isType = (0, _ramda.curry)(function (t, x) {
    return _op(_op(_op(x, callUnder({}.toString)), dot2('slice')(8, -1)), (0, _ramda.equals)(t));
});
var isArray = isType('Array');
var isFunction = isType('Function');

// --- map indexed: not sure about exporting these.
var mapIndexed = (0, _ramda.addIndex)(_ramda.map);
var mapAccumIndexed = (0, _ramda.addIndex)(_ramda.mapAccum);

// @test
var laatDat = exports.laatDat = (0, _ramda.curry)(function (fs, f, x) {
    return laat(_op(fs, (0, _ramda.map)(pass1(x))), function () {
        for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
            args[_key8] = arguments[_key8];
        }

        return _op(f, passN([x].concat(args)));
    });
});

// @test
var laatStarDat = exports.laatStarDat = (0, _ramda.curry)(function (fs, x) {
    return _op(_op(fs, (0, _ramda.map)(function (f) {
        return function () {
            for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
                args[_key9] = arguments[_key9];
            }

            return _op(f, passN([x].concat(args)));
        };
    })), applyN(laatStar));
});

var listDat = (0, _ramda.curry)(function (fs, n) {
    return _op(fs, (0, _ramda.map)(pass1(n)));
});

// --- or:
var listDat2 = function listDat2(n) {
    return _op((0, _ramda.map)(pass1(n)), flipC);
};
var listDat3 = flipC(function (n) {
    return (0, _ramda.map)(pass1(n));
});
// --- >> is higher.
var listDat4 = _op(_op(_op2(pass1, _ramda.map), _ramda.curry), flipC);
var listDat6 = _op(_op2(pass1, _ramda.map), flipC);

var listDat5 = flipC(function (n) {
    return _op(_op(n, pass1), _ramda.map);
});

var _$ = {};

var condElse = exports.condElse = appendTo([void 8]);

var condEquals = exports.condEquals = (0, _ramda.curry)(function (exec, testString) {
    return [
    //     testString | ifEquals (_$) (noop) (equals),
    _op(testString, _ramda.equals), exec];
});

var condPredicate = exports.condPredicate = (0, _ramda.curry)(function (exec, pred) {
    return [pred, exec];
});

var guard = exports.guard = condPredicate;
var otherwise = exports.otherwise = condElse;

var ifEquals = exports.ifEquals = (0, _ramda.curry)(function (test, yes, no, x) {
    return x === test ? yes(x) : no(x);
});
var whenEquals = exports.whenEquals = (0, _ramda.curry)(function (test, yes, x) {
    return _op(x, ifEquals(test)(yes)(noop));
});
var ifEquals__ = exports.ifEquals__ = function ifEquals__(x, test, yes) {
    var no = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;
    return _op(x, ifEquals(test)(yes)(no));
};

var gt = exports.gt = (0, _ramda.flip)(_ramda.gt);
var gte = exports.gte = (0, _ramda.flip)(_ramda.gte);
var lt = exports.lt = (0, _ramda.flip)(_ramda.lt);
var lte = exports.lte = (0, _ramda.flip)(_ramda.lte);

// --- different from R.equals, which considers two different objects equal if their contents are
//     the same.
// --- different from R.identical, which has some different semantics involving e.g. 0 and -0.
// --- literally just wraps ===.
// rationale: must be able to confidently refactor working code which uses ===
var eq = exports.eq = (0, _ramda.curry)(function (x, y) {
    return x === y;
});
var ne = exports.ne = (0, _ramda.curry)(function (x, y) {
    return x !== y;
});

var blush = exports.blush = function blush(x) {
    return function (_) {
        return x;
    };
};

var ignore = function ignore(n) {
    return function (f) {
        return function () {
            for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
                args[_key10] = arguments[_key10];
            }

            return _op(_op(_op(args, (0, _ramda.splitAt)(n)), prop(1)), applyN(f));
        };
    };
};
var headTail = function headTail(f) {
    return _op2((0, _ramda.splitAt)(1), f);
};
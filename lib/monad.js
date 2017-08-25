#!/usr/bin/env node
'use strict';

var _ramda = require('ramda');

var _fishLib = require('fish-lib');

var _fishLib2 = _interopRequireDefault(_fishLib);

var _index = require('./index');

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

var Id = function () {
    var proto = {
        val: undefined,
        map: function map(f) {
            return id(f(this.val));
        },

        // --- dunno how, needs xs
        apply: function apply(f) {},
        drop: function drop() {
            return this.val;
        },
        chain: function chain(f) {
            return f(this.val);
        }
    };

    return {
        of: function of(val) {
            return _op(_op(proto, Object.create), (0, _index.assocMut)('val')(val));
        }
    };
}();

var Just = function () {
    var proto = {
        val: undefined,
        map: function map(f) {
            return Just.of(f(this.val));
        },

        // --- dunno how, needs xs
        apply: function apply(f) {},
        drop: function drop() {
            return this.val;
        },
        chain: function chain(f) {
            return f(this.val);
        }
    };

    return {
        of: function of(val) {
            return _op(_op(proto, Object.create), (0, _index.assocMut)('val')(val));
        }
    };
}();

var Nothing = function () {
    var proto = {
        map: function map(f) {
            return Nothing.of();
        },

        // --- dunno how, needs xs
        apply: function apply(f) {},
        drop: function drop() {},

        // doesn't call f. ??
        chain: function chain(f) {}
    };

    return {
        of: function of(val) {
            return _op(proto, Object.create);
        }
    };
}();

var just = function just() {
    return Just.of.apply(Just, arguments);
};
var nothing = function nothing() {
    return Nothing.of.apply(Nothing, arguments);
};
var id = function id() {
    return Id.of.apply(Id, arguments);
};

var doe = function doe() {
    for (var _len = arguments.length, mainArgs = Array(_len), _key = 0; _key < _len; _key++) {
        mainArgs[_key] = arguments[_key];
    }

    var fs = _op(mainArgs, (0, _index.ifLengthOne)(function (it) {
        return it[0];
    }, function (it) {
        return it;
    }));

    var _doe = function _doe(fs, argsAcc) {
        return fs.length === 1 ? function () {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            return (0, _ramda.head)(fs).apply(null, [].concat(_toConsumableArray(argsAcc), args));
        } : function () {
            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
            }

            var chainVal = (0, _ramda.head)(fs).apply(null, [].concat(_toConsumableArray(argsAcc), args));
            var newArgsAcc = [].concat(_toConsumableArray(argsAcc), [chainVal.drop()]);
            return (0, _ramda.chain)(_doe((0, _ramda.tail)(fs), newArgsAcc))(chainVal);
        };
    };

    var firstReturn = (0, _ramda.head)(fs)();
    return (0, _ramda.chain)(_doe((0, _ramda.tail)(fs), [firstReturn.drop()]))(firstReturn);
};

// stretch the function out:
//
// (y) => id (x + y + 1)
//
// ->
//
// (x) => chain (recursive-stuff) (id (x + 1))
//
// and 'rewire it': before apply, prepend the accumulated vals to the args
//
// so
//
// (x, y) => x + y (given by user)
//
// needs to become
//
// (y) => x + y (needed by algorithm) (x is lexical)
//
// DWZ
//
// const f = head (fs)
// (...args) => chain (recursive-stuff) (f.apply (null, [...argsAcc, ...args]))
//
// seems like the accumulator is left in a strange state after this.
// try with 4!


/*
(struct id (val)
    #:transparent
    #:methods gen:functor
    [(define (map f x)
       (id (f (id-val x))))]
    #:methods gen:applicative
    [(define (pure _ x)
       (id x))
     (define (apply f xs)
       (base:apply (id-val f) (base:map id-val xs)))]
    #:methods gen:monad
    [(define (chain f x)
       (f (id-val x)))])

; --- (id 3)
(do
  [x <- (id 1)]
  [y <- (id 2)]
  (pure (+ x y)))

; --- equivalent to:

(chain
  (λ (x) (chain
            (λ (y) (pure (+ x y)))
            (id 2)))
  (id 1))

*/

// --- 'single' doesn't make that much sense (it will be wrapped).

// const singleMonadExpanded = id (1)
// const singleMonad = doe ([
//     () => id (1),
// ])
//
// console.log ('singleMonad')
// singleMonad | log
// console.log ('singleMonadExpanded')
// singleMonadExpanded | log

// remember that functions have a single return in js and always will (no 'array' return for me
// chump)

var doubleMonadExpanded = (0, _ramda.chain)(function (x) {
    return x + 1;
})(id(1)); // --- 2

_op(doubleMonadExpanded, _fishLib.log);

var doubleMonad = doe([function () {
    return id(1);
}, function (x) {
    return x + 1;
}]); // --- 2.

_op(doubleMonad, _fishLib.log);

var tripleMonadExpanded = (0, _ramda.chain)(function (x) {
    return (0, _ramda.chain)(function (y) {
        return x + y;
    } // --- 35.
    )(id(x + 25));
})(id(5));

_op(tripleMonadExpanded, _fishLib.log);

var tripleMonad = doe([function () {
    return id(5);
}, function (x) {
    return id(x + 25);
}, function (x, y) {
    return x + y;
}]);

_op(tripleMonad, _fishLib.log);

// --- each step always takes one arg.

var quadrupleMonadExpanded = (0, _ramda.chain)(function (x) {
    return (0, _ramda.chain)(function (y) {
        return (0, _ramda.chain)(function (z) {
            return x + y + z;
        })(id(x * y));
    } // --- z = 39.
    )(id(x + 10));
} // --- y = 13.
)(id(3)); // --- x = 3.

_op(quadrupleMonadExpanded, _fishLib.log);

var quadrupleMonad = doe([function () {
    return id(3);
}, function (x) {
    return id(x + 10);
}, function (x, y) {
    return id(x * y);
},

// --- last one doesn't have to be a monad.
// BUT you might want it to be, e.g. safeDivide, and then it's annoying to have to do another
// step.
// maybe doeStar or something like that?
function (x, y, z) {
    return x + y + z;
}]);

_op(quadrupleMonad, _fishLib.log);

// isEmpty OR is nothing?
var safeFirst = function safeFirst(xs) {
    return (0, _ramda.isEmpty)(xs) ? nothing() : just((0, _ramda.head)(xs));
};

var safeRest = function safeRest(xs) {
    return (0, _ramda.isEmpty)(xs) ? nothing() // or empty list ??
    : just((0, _ramda.tail)(xs));
};

var safeDivide = function safeDivide(a) {
    return function (b) {
        return b === 0 ? nothing() : just(a / b);
    };
};_op(_op([], safeFirst), _fishLib.log);_op(_op([1, 2, 3], safeFirst), _fishLib.log);_op(_op(_op([1, 2, 3], safeFirst), (0, _ramda.prop)('val')), _fishLib.log);

var divideFirstTwoMonadic = function divideFirstTwoMonadic(xs) {
    return doe(function () {
        return safeFirst(xs);
    }, function (a) {
        return safeRest(xs);
    }, function (a, ys) {
        return safeFirst(ys);
    }, function (a, ys, b) {
        return safeDivide(a)(b);
    }, function (a, ys, b, x) {
        return x;
    });
};

_op(divideFirstTwoMonadic([1, 2, 3]), _fishLib.log); // --- 1.2
_op(divideFirstTwoMonadic([1, 0, 3]), _fishLib.log); // --- nothing
_op(divideFirstTwoMonadic([1]), _fishLib.log); // --- undefined (?)
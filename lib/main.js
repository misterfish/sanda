var ref$, assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, join, split, rProp, rPath, rDefaultTo, curry, each, complement, isNil, rRepeat, rTimes, reverse, tap, flip, zip, arrayLs, test, xtest, expectToEqual, expectToBe, ok, array, zipAll, cascade, bind, flipC, compact, compactOk, times, repeat, sprintf1, sprintfN, given, laat, givenStar, laatStar;
ref$ = require('ramda'), assoc = ref$.assoc, assocPath = ref$.assocPath, head = ref$.head, tail = ref$.tail, reduceRight = ref$.reduceRight, chain = ref$.chain, identity = ref$.identity, reduce = ref$.reduce, map = ref$.map, filter = ref$.filter, join = ref$.join, split = ref$.split, rProp = ref$.prop, rPath = ref$.path, rDefaultTo = ref$.defaultTo, curry = ref$.curry, each = ref$.forEach, complement = ref$.complement, isNil = ref$.isNil, rRepeat = ref$.repeat, rTimes = ref$.times, reverse = ref$.reverse, tap = ref$.tap, flip = ref$.flip, zip = ref$.zip;
ref$ = require('./common'), arrayLs = ref$.arrayLs, test = ref$.test, xtest = ref$.xtest, expectToEqual = ref$.expectToEqual, expectToBe = ref$.expectToBe;
ref$ = require('../lib/index'), ok = ref$.ok, array = ref$.array, zipAll = ref$.zipAll, cascade = ref$.cascade, bind = ref$.bind, flipC = ref$.flipC, compact = ref$.compact, compactOk = ref$.compactOk, times = ref$.times, repeat = ref$.repeat, sprintf1 = ref$.sprintf1, sprintfN = ref$.sprintfN, given = ref$.given, laat = ref$.laat, givenStar = ref$.givenStar, laatStar = ref$.laatStar;
describe('cascade', function(){
  return test(1, function(){
    var odd, this$ = this;
    odd = function(x){
      return x % 2 !== 0;
    };
    return expectToEqual([2, 6, 10])(
    cascade([1, 2, 3, 4, 5], filter(odd), map((function(it){
      return it * 2;
    }))));
  });
});
describe('bind', function(){
  var obj;
  obj = {
    name: 'dog',
    speak: function(){
      return 'my name is ' + this.name;
    },
    garble: function(){
      var args, res$, i$, to$;
      res$ = [];
      for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      args = res$;
      return join('!', args);
    }
  };
  test('binds', function(){
    var badSpeak, goodSpeak;
    badSpeak = obj.speak;
    expect(badSpeak()).not.toEqual('my name is dog');
    goodSpeak = bind(obj, 'speak');
    return expect(goodSpeak()).toEqual('my name is dog');
  });
  test('passes args', function(){
    var garble;
    garble = bind(obj, 'garble');
    return expectToEqual('a!1!c')(
    garble('a', 1, 'c'));
  });
  return test('curried', function(){
    return expectToEqual('my name is dog')(
    function(x){
      return x();
    }(
    bind(obj)(
    'speak')));
  });
});
describe('flipC', function(){
  var fn;
  fn = flipC;
  describe('target created with "haskell" curry notation', function(){
    var divide, divideAndAddThreeArgs, divideAndAddFourArgs, divideFlipped, divideAndAddThreeArgsFlipped, divideAndAddFourArgsFlipped;
    divide = function(a){
      return function(b){
        return a / b;
      };
    };
    divideAndAddThreeArgs = function(a){
      return function(b){
        return function(c){
          return a / b + c;
        };
      };
    };
    divideAndAddFourArgs = function(a){
      return function(b){
        return function(c){
          return function(d){
            return a / b + c + d;
          };
        };
      };
    };
    divideFlipped = flipC(divide);
    divideAndAddThreeArgsFlipped = flipC(divideAndAddThreeArgs);
    divideAndAddFourArgsFlipped = flipC(divideAndAddFourArgs);
    test('init', function(){
      expect(divide(10)(5)).toEqual(2);
      expect(divideAndAddThreeArgs(10)(5)(1)).toEqual(3);
      return expect(divideAndAddFourArgs(10)(5)(1)(2)).toEqual(5);
    });
    describe('2 args', function(){
      test(1, function(){
        return expect(divideFlipped(10, 5)).toEqual(0.5);
      });
      return test('result is curried', function(){
        return expect(divideFlipped(10)(5)).toEqual(0.5);
      });
    });
    describe('2 + 1 args', function(){
      test(1, function(){
        return expect(divideAndAddThreeArgsFlipped(10, 5, 1)).toEqual(1.5);
      });
      return test('result is curried', function(){
        return expect(divideAndAddThreeArgsFlipped(10)(5)(1)).toEqual(1.5);
      });
    });
    return describe('2 + > 1 args', function(){
      test(1, function(){
        return expect(divideAndAddFourArgsFlipped(10, 5, 1, 2)).toEqual(3.5);
      });
      return test('result is curried', function(){
        return expect(divideAndAddFourArgsFlipped(10)(5)(1)(2)).toEqual(3.5);
      });
    });
  });
  describe('target created with LS curry function', function(){
    var divide, divideAndAddThreeArgs, divideAndAddFourArgs, divideFlipped, divideAndAddThreeArgsFlipped, divideAndAddFourArgsFlipped;
    divide = curry$(function(a, b){
      return a / b;
    });
    divideAndAddThreeArgs = curry$(function(a, b, c){
      return a / b + c;
    });
    divideAndAddFourArgs = curry$(function(a, b, c, d){
      return a / b + c + d;
    });
    divideFlipped = flipC(divide);
    divideAndAddThreeArgsFlipped = flipC(divideAndAddThreeArgs);
    divideAndAddFourArgsFlipped = flipC(divideAndAddFourArgs);
    test('init', function(){
      expect(divide(10)(5)).toEqual(2);
      expect(divideAndAddThreeArgs(10)(5)(1)).toEqual(3);
      return expect(divideAndAddFourArgs(10)(5)(1)(2)).toEqual(5);
    });
    describe('2 args', function(){
      test(1, function(){
        return expect(divideFlipped(10, 5)).toEqual(0.5);
      });
      return test('result is curried', function(){
        return expect(divideFlipped(10)(5)).toEqual(0.5);
      });
    });
    describe('2 + 1 args', function(){
      test(1, function(){
        return expect(divideAndAddThreeArgsFlipped(10, 5, 1)).toEqual(1.5);
      });
      return test('result is curried', function(){
        return expect(divideAndAddThreeArgsFlipped(10)(5)(1)).toEqual(1.5);
      });
    });
    return describe('2 + > 1 args', function(){
      test(1, function(){
        return expect(divideAndAddFourArgsFlipped(10, 5, 1, 2)).toEqual(3.5);
      });
      return test('result is curried', function(){
        return expect(divideAndAddFourArgsFlipped(10)(5)(1)(2)).toEqual(3.5);
      });
    });
  });
  return describe('target created with ramda curry function', function(){
    var divide, divideAndAddThreeArgs, divideAndAddFourArgs, divideFlipped, divideAndAddThreeArgsFlipped, divideAndAddFourArgsFlipped;
    divide = curry(function(a, b){
      return a / b;
    });
    divideAndAddThreeArgs = curry(function(a, b, c){
      return a / b + c;
    });
    divideAndAddFourArgs = curry(function(a, b, c, d){
      return a / b + c + d;
    });
    divideFlipped = flipC(divide);
    divideAndAddThreeArgsFlipped = flipC(divideAndAddThreeArgs);
    divideAndAddFourArgsFlipped = flipC(divideAndAddFourArgs);
    test('init', function(){
      expect(divide(10)(5)).toEqual(2);
      expect(divideAndAddThreeArgs(10)(5)(1)).toEqual(3);
      return expect(divideAndAddFourArgs(10)(5)(1)(2)).toEqual(5);
    });
    describe('2 args', function(){
      test(1, function(){
        return expect(divideFlipped(10, 5)).toEqual(0.5);
      });
      return test('result is curried', function(){
        return expect(divideFlipped(10)(5)).toEqual(0.5);
      });
    });
    describe('2 + 1 args', function(){
      test(1, function(){
        return expect(divideAndAddThreeArgsFlipped(10, 5, 1)).toEqual(1.5);
      });
      return test('result is curried', function(){
        return expect(divideAndAddThreeArgsFlipped(10)(5)(1)).toEqual(1.5);
      });
    });
    return describe('2 + > 1 args', function(){
      test(1, function(){
        return expect(divideAndAddFourArgsFlipped(10, 5, 1, 2)).toEqual(3.5);
      });
      return test('result is curried', function(){
        return expect(divideAndAddFourArgsFlipped(10)(5)(1)(2)).toEqual(3.5);
      });
    });
  });
});
describe('laat', function(){
  test('alias given', function(){
    return expect(given).toBe(laat);
  });
  return test(1, function(){
    return laat([10, 12, 19], function(ten, twelve, nineteen){
      return expect(ten + twelve + nineteen).toEqual(41);
    });
  });
});
describe('laatStar', function(){
  test('alias givenStar', function(){
    return expect(givenStar).toBe(laatStar);
  });
  test('superset of laat', function(){
    return laatStar([10, 12, 19], function(ten, twelve, nineteen){
      return expect(ten + twelve + nineteen).toEqual(41);
    });
  });
  test('recursive references', function(){
    return laatStar([
      10, function(ten){
        return ten + 2;
      }, function(ten, twelve){
        return twelve + 7;
      }, function(ten, twelve, nineteen){
        return 2;
      }
    ], function(ten, twelve, nineteen, two){
      return expectToEqual(43)(
      ten + twelve + nineteen + two);
    });
  });
  test('single function', function(){
    return laatStar([function(){
      return 11;
    }], function(eleven){
      return expect(eleven).toEqual(11);
    });
  });
  test('mixed references', function(){
    return laatStar([
      10, function(ten){
        return ten + 2;
      }, 19, function(ten, twelve, nineteen){
        return 2;
      }, 5
    ], function(ten, twelve, nineteen, two, five){
      return expectToEqual(48)(
      ten + twelve + nineteen + two + five);
    });
  });
  return test('fibonacci', function(){
    var fibonacci;
    fibonacci = function(n){
      var sumLastTwo, entry, refs;
      sumLastTwo = function(xs){
        return xs[xs.length - 1] + xs[xs.length - 2];
      };
      entry = function(){
        var prev, res$, i$, to$, m;
        res$ = [];
        for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
          res$.push(arguments[i$]);
        }
        prev = res$;
        m = prev.length;
        switch (false) {
        case m !== 0:
          return 1;
        case m !== 1:
          return 1;
        default:
          return sumLastTwo(prev);
        }
      };
      refs = times(n + 1, function(){
        return entry;
      });
      return laatStar(refs, arrayLs);
    };
    expect(fibonacci(0)).toEqual([1]);
    expect(fibonacci(1)).toEqual([1, 1]);
    expect(fibonacci(2)).toEqual([1, 1, 2]);
    expect(fibonacci(8)).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34]);
    return expect(fibonacci(9)).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
});
describe('repeat', function(){
  return test(1, function(){
    return expectToEqual(['thing', 'thing', 'thing', 'thing', 'thing'])(
    repeat(5)(
    'thing'));
  });
});
describe('times', function(){
  var thing;
  thing = function(i){
    return i;
  };
  return test(1, function(){
    return expectToEqual([0, 1, 2, 3, 4])(
    times(5)(
    thing));
  });
});
describe('compact*', function(){
  var mixed, falsey, truthy;
  mixed = [1, '', 0, '0', void 8, false, true, 2];
  falsey = [false, void 8, null, '', 0, NaN];
  truthy = [true, '0', [], {}, -1, Infinity];
  describe('compact', function(){
    test(1, function(){
      return expectToEqual([1, '0', true, 2])(
      compact(
      mixed));
    });
    test('all falsey', function(){
      return expectToEqual([])(
      compact(
      falsey));
    });
    return test('all truthy', function(){
      return expectToEqual(truthy)(
      compact(
      truthy));
    });
  });
  return describe('compactOk', function(){
    test(1, function(){
      return expectToEqual([1, '', 0, '0', false, true, 2])(
      compactOk(
      mixed));
    });
    test('all falsey', function(){
      return expectToEqual([false, '', 0, NaN])(
      compactOk(
      falsey));
    });
    return test('all truthy', function(){
      return expectToEqual(truthy)(
      compactOk(
      truthy));
    });
  });
});
describe('sprintf*', function(){
  describe('sprintf1', function(){
    test(1, function(){
      return expectToEqual('my name is dog')(
      sprintf1('my name is %s')(
      'dog'));
    });
    return test(2, function(){
      return expectToEqual('my name is 3.33')(
      sprintf1('my name is %0.2f')(
      10 / 3));
    });
  });
  return describe('sprintfn', function(){
    test(1, function(){
      return expectToEqual('my name is not dog')(
      sprintfN('my name %s not %s')(
      ['is', 'dog']));
    });
    return test(2, function(){
      return expectToEqual('my name is 3.33')(
      sprintfN('my name %s %0.2f')(
      ['is', 10 / 3]));
    });
  });
});
describe('array', function(){
  return test(1, function(){
    return expectToEqual([3, 4, 5])(
    array(3, 4, 5));
  });
});
describe('zip-all', function(){
  test(1, function(){
    return expectToEqual([[1, 'un'], [2, 'deux'], [3, 'trois']])(
    zipAll([1, 2, 3], ['un', 'deux', 'trois']));
  });
  return test(2, function(){
    return expectToEqual([['un', 'yek', 'egy'], ['deux', 'do', 'ketto'], ['trois', 'seh', 'harom']])(
    zipAll(['un', 'deux', 'trois'], ['yek', 'do', 'seh'], ['egy', 'ketto', 'harom']));
  });
});
function curry$(f, bound){
  var context,
  _curry = function(args) {
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      context = bound ? context || this : this;
      return params.push.apply(params, arguments) <
          f.length && arguments.length ?
        _curry.call(context, params) : f.apply(context, params);
    } : f;
  };
  return _curry();
}
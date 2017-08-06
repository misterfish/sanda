var ref$, assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, join, split, rProp, rPath, rDefaultTo, curry, each, complement, isNil, rRepeat, rTimes, reverse, tap, flip, zip, arrayLs, arrayJs, array, log, test, xtest, m1, zipAll, toEqual, toBe, expectToEqual, expectToBe, ok, bitwiseAnd, bitwiseOr, bitwiseXor, bitwiseNot, bitwiseLeft, bitwiseRight, bitwiseRightZeroFill, dot, dot1, dot2, dot3, dotN, dotMut, dot1Mut, dot2Mut, dot3Mut, dotNMut, tapDot, tapDot1, tapDot2, tapDot3, tapDotN, tapMut, tapDotMut, tapDot1Mut, tapDot2Mut, tapDot3Mut, tapDotNMut, ifTrue, condTrue, ifTrueRF, cascade, bind, appendTo, appendToMut, appendFrom, appendFromMut, prependFrom, prependFromMut, prependTo, prependToMut, concatTo, concatToMut, concatFrom, concatFromMut, mergeTo, mergeFrom, mergeToMut, mergeFromMut, mergeToIn, mergeFromIn, mergeToInMut, mergeFromInMut, flipC, given, laat, givenStar, laatStar, times, repeat, compact, compactOk, sprintf1, sprintfN, tryCatch, run, testMut;
ref$ = require('ramda'), assoc = ref$.assoc, assocPath = ref$.assocPath, head = ref$.head, tail = ref$.tail, reduceRight = ref$.reduceRight, chain = ref$.chain, identity = ref$.identity, reduce = ref$.reduce, map = ref$.map, filter = ref$.filter, join = ref$.join, split = ref$.split, rProp = ref$.prop, rPath = ref$.path, rDefaultTo = ref$.defaultTo, curry = ref$.curry, each = ref$.forEach, complement = ref$.complement, isNil = ref$.isNil, rRepeat = ref$.repeat, rTimes = ref$.times, reverse = ref$.reverse, tap = ref$.tap, flip = ref$.flip, zip = ref$.zip;
arrayLs = function(){
  var i$, x$, len$, results$ = [];
  for (i$ = 0, len$ = (arguments).length; i$ < len$; ++i$) {
    x$ = (arguments)[i$];
    results$.push(x$);
  }
  return results$;
};
arrayJs = function(){
  var args, res$, i$, to$;
  res$ = [];
  for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
    res$.push(arguments[i$]);
  }
  args = res$;
  return args;
};
array = arrayJs;
log = bind$(console, 'log');
test = curry$(function(desc, theTest){
  return global.it(desc, theTest);
});
xtest = curry$(function(desc, theTest){
  return global.xit(desc, theTest);
});
m1 = curry$(function(prop, x, o){
  return o[prop](x);
});
zipAll = function(){
  var xss, res$, i$, to$, l, i, lresult$, j$, len$, xs, results$ = [];
  res$ = [];
  for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
    res$.push(arguments[i$]);
  }
  xss = res$;
  l = xss[0].length;
  for (i$ = 0, to$ = l - 1; i$ <= to$; ++i$) {
    i = i$;
    lresult$ = [];
    for (j$ = 0, len$ = xss.length; j$ < len$; ++j$) {
      xs = xss[j$];
      lresult$.push(xs[i]);
    }
    results$.push(lresult$);
  }
  return results$;
};
toEqual = m1('toEqual');
toBe = m1('toBe');
expectToEqual = curry$(function(expected, received){
  return toEqual(expected)(
  expect(
  received));
});
expectToBe = curry$(function(expected, received){
  return toBe(expected)(
  expect(
  received));
});
ref$ = require('../lib/index'), ok = ref$.ok, bitwiseAnd = ref$.bitwiseAnd, bitwiseOr = ref$.bitwiseOr, bitwiseXor = ref$.bitwiseXor, bitwiseNot = ref$.bitwiseNot, bitwiseLeft = ref$.bitwiseLeft, bitwiseRight = ref$.bitwiseRight, bitwiseRightZeroFill = ref$.bitwiseRightZeroFill, dot = ref$.dot, dot1 = ref$.dot1, dot2 = ref$.dot2, dot3 = ref$.dot3, dotN = ref$.dotN, dotMut = ref$.dotMut, dot1Mut = ref$.dot1Mut, dot2Mut = ref$.dot2Mut, dot3Mut = ref$.dot3Mut, dotNMut = ref$.dotNMut, tapDot = ref$.tapDot, tapDot1 = ref$.tapDot1, tapDot2 = ref$.tapDot2, tapDot3 = ref$.tapDot3, tapDotN = ref$.tapDotN, tapMut = ref$.tapMut, tapDotMut = ref$.tapDotMut, tapDot1Mut = ref$.tapDot1Mut, tapDot2Mut = ref$.tapDot2Mut, tapDot3Mut = ref$.tapDot3Mut, tapDotNMut = ref$.tapDotNMut, ifTrue = ref$.ifTrue, condTrue = ref$.condTrue, ifTrueRF = ref$.ifTrueRF, cascade = ref$.cascade, bind = ref$.bind, appendTo = ref$.appendTo, appendToMut = ref$.appendToMut, appendFrom = ref$.appendFrom, appendFromMut = ref$.appendFromMut, prependFrom = ref$.prependFrom, prependFromMut = ref$.prependFromMut, prependTo = ref$.prependTo, prependToMut = ref$.prependToMut, concatTo = ref$.concatTo, concatToMut = ref$.concatToMut, concatFrom = ref$.concatFrom, concatFromMut = ref$.concatFromMut, mergeTo = ref$.mergeTo, mergeFrom = ref$.mergeFrom, mergeToMut = ref$.mergeToMut, mergeFromMut = ref$.mergeFromMut, mergeToIn = ref$.mergeToIn, mergeFromIn = ref$.mergeFromIn, mergeToInMut = ref$.mergeToInMut, mergeFromInMut = ref$.mergeFromInMut, flipC = ref$.flipC, given = ref$.given, laat = ref$.laat, givenStar = ref$.givenStar, laatStar = ref$.laatStar, times = ref$.times, repeat = ref$.repeat, compact = ref$.compact, compactOk = ref$.compactOk, sprintf1 = ref$.sprintf1, sprintfN = ref$.sprintfN, tryCatch = ref$.tryCatch;
describe('ifTrue', function(){
  var doTest, tests;
  doTest = curry$(function(fn, arg$){
    var desc, inputVal, jaVal, expectNumCalls, expectRet;
    desc = arg$.desc, inputVal = arg$.inputVal, jaVal = arg$.jaVal, expectNumCalls = arg$.expectNumCalls, expectRet = arg$.expectRet;
    return test(desc, function(){
      var x$, ja, ret;
      x$ = ja = jest.fn();
      x$.mockReturnValue(jaVal);
      ret = fn(ja)(
      inputVal);
      expect(ja.mock.calls.length).toEqual(
      expectNumCalls);
      expect(ret).toEqual(
      expectRet);
      return expect(ret).toEqual(expectRet);
    });
  });
  tests = array({
    desc: 'true',
    inputVal: true,
    jaVal: 42,
    expectNumCalls: 1,
    expectRet: 42
  }, {
    desc: 'false',
    inputVal: false,
    jaVal: 42,
    expectNumCalls: 0,
    expectRet: void 8
  }, {
    desc: 'empty string',
    inputVal: '',
    jaVal: 42,
    expectNumCalls: 0,
    expectRet: void 8
  }, {
    desc: 'undefined',
    inputVal: void 8,
    jaVal: 42,
    expectNumCalls: 0,
    expectRet: void 8
  });
  return each(doTest(ifTrue))(
  tests);
});
describe('condTrue', function(){
  var doTest, tests;
  doTest = curry$(function(fn, arg$){
    var desc, inputVal, jaVal, neeVal, expectNumCalls, expectRet;
    desc = arg$.desc, inputVal = arg$.inputVal, jaVal = arg$.jaVal, neeVal = arg$.neeVal, expectNumCalls = arg$.expectNumCalls, expectRet = arg$.expectRet;
    return test(desc, function(){
      var x$, ja, y$, nee, ret;
      x$ = ja = jest.fn();
      x$.mockReturnValue(jaVal);
      y$ = nee = jest.fn();
      y$.mockReturnValue(neeVal);
      ret = fn(ja, nee)(
      inputVal);
      expect(ja.mock.calls.length).toEqual(
      expectNumCalls[0]);
      expect(nee.mock.calls.length).toEqual(
      expectNumCalls[1]);
      return expect(ret).toEqual(
      expectRet);
    });
  });
  tests = array({
    desc: 'true',
    inputVal: true,
    jaVal: 42,
    neeVal: 43,
    expectNumCalls: [1, 0],
    expectRet: 42
  }, {
    desc: 'false',
    inputVal: false,
    jaVal: 42,
    neeVal: 43,
    expectNumCalls: [0, 1],
    expectRet: 43
  }, {
    desc: 'empty string',
    inputVal: '',
    jaVal: 42,
    neeVal: 43,
    expectNumCalls: [0, 1],
    expectRet: 43
  });
  return each(doTest(condTrue))(
  tests);
});
describe('ifTrueRF', function(){
  var fn, theTest, tests, doTest;
  fn = ifTrueRF;
  theTest = function(vals){
    var inputVal, doNee, jaVal, neeVal, expectNumCalls, expectRet, x$, ja, y$, nee, ret;
    inputVal = vals.inputVal, doNee = vals.doNee, jaVal = vals.jaVal, neeVal = vals.neeVal, expectNumCalls = vals.expectNumCalls, expectRet = vals.expectRet;
    x$ = ja = jest.fn();
    x$.mockReturnValue(jaVal);
    y$ = nee = jest.fn();
    y$.mockReturnValue(neeVal);
    ret = doNee
      ? fn(inputVal, ja, nee)
      : fn(inputVal, ja);
    expect(ja.mock.calls.length).toEqual(
    expectNumCalls[0]);
    expect(nee.mock.calls.length).toEqual(
    expectNumCalls[1]);
    return expect(ret).toEqual(
    expectRet);
  };
  tests = array({
    desc: 'true',
    inputVal: true,
    doNee: true,
    jaVal: 42,
    neeVal: 43,
    expectNumCalls: [1, 0],
    expectRet: 42
  }, {
    desc: 'true, no else',
    inputVal: true,
    doNee: false,
    jaVal: 42,
    expectNumCalls: [1, 0],
    expectRet: 42
  }, {
    desc: 'false',
    inputVal: false,
    doNee: true,
    jaVal: 42,
    neeVal: 43,
    expectNumCalls: [0, 1],
    expectRet: 43
  }, {
    desc: 'false, no else',
    inputVal: false,
    doNee: false,
    jaVal: 42,
    expectNumCalls: [0, 0],
    expectRet: void 8
  });
  doTest = function(vals){
    return test(vals.desc, function(){
      return theTest(vals);
    });
  };
  return each(doTest)(
  tests);
});
describe('cascade', function(){
  return test(1, function(){
    var odd, ret, this$ = this;
    odd = function(x){
      return x % 2 !== 0;
    };
    ret = cascade([1, 2, 3, 4, 5], filter(odd), map((function(it){
      return it * 2;
    })));
    return expect(ret).toEqual([2, 6, 10]);
  });
});
describe('bind', function(){
  return test(1, function(){
    var obj, badSpeak, goodSpeak;
    obj = {
      name: 'dog',
      speak: function(){
        return 'my name is ' + this.name;
      }
    };
    badSpeak = obj.speak;
    expect(badSpeak()).not.toEqual('my name is dog');
    goodSpeak = bind(obj, 'speak');
    return expect(goodSpeak()).toEqual('my name is dog');
  });
});
run = function(args){
  var fn, src, tgt, dir;
  fn = args.fn, src = args.src, tgt = args.tgt, dir = args.dir;
  if (dir === 'to') {
    return fn(tgt)(
    src);
  } else {
    return fn(src)(
    tgt);
  }
};
testMut = function(args){
  var res, mut, tgt;
  res = args.res, mut = args.mut, tgt = args.tgt;
  if (mut) {
    return expect(res).toBe(tgt);
  } else {
    return expect(res).not.toBe(tgt);
  }
};
describe('appendTo', function(){
  var fn, dir, mut;
  fn = appendTo;
  dir = 'to';
  mut = false;
  test(1, function(){
    var tgt, src, res;
    tgt = [1, 2, 3];
    src = [4, 5, 6];
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual([1, 2, 3, [4, 5, 6]]);
  });
  test(2, function(){
    var tgt, src, res;
    tgt = [1, 2, 3];
    src = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual([1, 2, 3, 4]);
  });
  return test('eg', function(){
    var res;
    res = appendTo([4])(
    3);
    return expect(res).toEqual([4, 3]);
  });
});
describe('appendToMut', function(){
  var fn, dir, mut;
  fn = appendToMut;
  dir = 'to';
  mut = true;
  test('array to array', function(){
    var tgt, src, res;
    tgt = [1, 2, 3];
    src = [4, 5, 6];
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual([1, 2, 3, [4, 5, 6]]);
  });
  test('elem to array', function(){
    var tgt, src, res;
    tgt = [1, 2, 3];
    src = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual([1, 2, 3, 4]);
  });
  return test('eg', function(){
    var res;
    res = appendToMut([4])(
    3);
    return expect(res).toEqual([4, 3]);
  });
});
describe('appendFrom', function(){
  var fn, dir, mut;
  fn = appendFrom;
  dir = 'from';
  mut = false;
  test(1, function(){
    var tgt, src, res;
    tgt = [1, 2, 3];
    src = [4, 5, 6];
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual([1, 2, 3, [4, 5, 6]]);
  });
  test(2, function(){
    var tgt, src, res;
    tgt = [1, 2, 3];
    src = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual([1, 2, 3, 4]);
  });
  return test('eg', function(){
    var res;
    res = appendFrom(4)(
    [3]);
    return expect(res).toEqual([3, 4]);
  });
});
describe('appendFromMut', function(){
  var fn, dir, mut;
  fn = appendFromMut;
  dir = 'from';
  mut = true;
  test('array -> array', function(){
    var tgt, src, res;
    tgt = [1, 2, 3];
    src = [4, 5, 6];
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual([1, 2, 3, [4, 5, 6]]);
  });
  test('elem -> array', function(){
    var tgt, src, res;
    tgt = [1, 2, 3];
    src = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual([1, 2, 3, 4]);
  });
  return test('eg', function(){
    var res;
    res = appendFromMut(3)(
    [4]);
    return expect(res).toEqual([4, 3]);
  });
});
describe('prependTo', function(){
  var fn, dir, mut;
  fn = prependTo;
  dir = 'to';
  mut = false;
  test('array -> array', function(){
    var tgt, src, res;
    tgt = [1, 2, 3];
    src = [4, 5, 6];
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual([[4, 5, 6], 1, 2, 3]);
  });
  test('number -> array', function(){
    var tgt, src, res;
    tgt = [1, 2, 3];
    src = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual([4, 1, 2, 3]);
  });
  return test('eg', function(){
    var res;
    res = prependTo([4])(
    3);
    return expect(res).toEqual([3, 4]);
  });
});
describe('prependFrom', function(){
  var fn, dir, mut;
  fn = prependFrom;
  dir = 'from';
  mut = false;
  test('array -> array', function(){
    var tgt, src, res;
    tgt = [1, 2, 3];
    src = [4, 5, 6];
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual([[4, 5, 6], 1, 2, 3]);
  });
  test('element -> array', function(){
    var tgt, src, res;
    tgt = [1, 2, 3];
    src = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual([4, 1, 2, 3]);
  });
  return test('eg', function(){
    var res;
    res = prependFrom(3)(
    [4]);
    return expect(res).toEqual([3, 4]);
  });
});
describe('prependFromMut', function(){
  var fn, dir, mut;
  fn = prependFromMut;
  dir = 'from';
  mut = true;
  test('array to array', function(){
    var tgt, src, res;
    tgt = [1, 2, 3];
    src = [4, 5, 6];
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual([[4, 5, 6], 1, 2, 3]);
  });
  test('elem to array', function(){
    var tgt, src, res;
    tgt = [1, 2, 3];
    src = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual([4, 1, 2, 3]);
  });
  return test('eg', function(){
    var res;
    res = prependFromMut(4)(
    [3]);
    return expect(res).toEqual([4, 3]);
  });
});
describe('prependToMut', function(){
  var fn, dir, mut;
  fn = prependToMut;
  dir = 'to';
  mut = true;
  test('array to array', function(){
    var tgt, src, res;
    tgt = [1, 2, 3];
    src = [4, 5, 6];
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual([[4, 5, 6], 1, 2, 3]);
  });
  test('elem to array', function(){
    var tgt, src, res;
    tgt = [1, 2, 3];
    src = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual([4, 1, 2, 3]);
  });
  return test('eg', function(){
    var res;
    res = prependToMut([3])(
    4);
    return expect(res).toEqual([4, 3]);
  });
});
describe('concatTo', function(){
  var fn, dir, mut;
  fn = concatTo;
  dir = 'to';
  mut = false;
  test('array -> array', function(){
    var tgt, src, res;
    tgt = [1, 2, 3];
    src = [4, 5, 6];
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual([1, 2, 3, 4, 5, 6]);
  });
  test('string -> string', function(){
    var tgt, src, res;
    tgt = "don't give me no ";
    src = 'jibber jabber';
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual(tgt + src);
  });
  return test('unequal types => throw', function(){
    var tgt, src;
    tgt = [1, 2, 3];
    src = 4;
    return expect(function(){
      return concatTo(tgt)(
      src);
    }).toThrow();
  });
});
describe('concatToMut', function(){
  var fn, dir, mut;
  fn = concatToMut;
  dir = 'to';
  mut = true;
  test(1, function(){
    var tgt, src, res;
    tgt = [1, 2, 3];
    src = [4, 5, 6];
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual([1, 2, 3, 4, 5, 6]);
  });
  return test('strings -> throw', function(){
    var tgt, src;
    tgt = "don't give me no ";
    src = 'jibber jabber';
    return expect(function(){
      return concatToMut(tgt)(
      src);
    }).toThrow();
  });
});
describe('concatFrom', function(){
  var fn, dir, mut;
  fn = concatFrom;
  dir = 'from';
  mut = false;
  test('array -> array', function(){
    var tgt, src, res;
    tgt = [1, 2, 3];
    src = [4, 5, 6];
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual([1, 2, 3, 4, 5, 6]);
  });
  return test('elem -> array', function(){
    var tgt, src;
    tgt = [1, 2, 3];
    src = 4;
    return expect(function(){
      return concatFrom(tgt)(
      src);
    }).toThrow();
  });
});
describe('concatFromMut', function(){
  var fn, dir, mut;
  fn = concatFromMut;
  dir = 'from';
  mut = true;
  return test(1, function(){
    var tgt, src, res;
    tgt = [1, 2, 3];
    src = [4, 5, 6];
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
describe('mergeTo', function(){
  var fn, dir, mut;
  fn = mergeTo;
  dir = 'to';
  mut = false;
  test(1, function(){
    var tgt, src, res;
    tgt = {
      a: 1,
      b: 2
    };
    src = {
      b: 3,
      c: 4
    };
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual({
      a: 1,
      b: 3,
      c: 4
    });
  });
  test('discards non-own vals 1', function(){
    var x$, tgt, y$, src, res;
    x$ = tgt = Object.create({
      hidden: 42
    });
    x$.a = 1;
    x$.b = 2;
    y$ = src = Object.create({
      hidden: 43
    });
    y$.b = 3;
    y$.c = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    expect(res).toEqual({
      a: 1,
      b: 3,
      c: 4
    });
    return expect(res.hidden).toEqual(void 8);
  });
  test('discards non-own vals 2', function(){
    var x$, tgt, y$, src, res;
    x$ = tgt = Object.create({
      hidden: 42
    });
    x$.a = 1;
    x$.b = 2;
    y$ = src = Object.create({});
    y$.b = 3;
    y$.c = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    expect(res).toEqual({
      a: 1,
      b: 3,
      c: 4
    });
    return expect(res.hidden).toEqual(void 8);
  });
  return test('discards non-own vals 3', function(){
    var x$, tgt, y$, src, res;
    x$ = tgt = Object.create({});
    x$.a = 1;
    x$.b = 2;
    y$ = src = Object.create({
      hidden: 43
    });
    y$.b = 3;
    y$.c = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    expect(res).toEqual({
      a: 1,
      b: 3,
      c: 4
    });
    return expect(res.hidden).toEqual(void 8);
  });
});
describe('mergeFrom', function(){
  var fn, dir, mut;
  fn = mergeFrom;
  dir = 'from';
  mut = false;
  test(1, function(){
    var tgt, src, res;
    tgt = {
      a: 1,
      b: 2
    };
    src = {
      b: 3,
      c: 4
    };
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual({
      a: 1,
      b: 3,
      c: 4
    });
  });
  test('discards non-own vals 1', function(){
    var x$, tgt, y$, src, res;
    x$ = tgt = Object.create({
      hidden: 42
    });
    x$.a = 1;
    x$.b = 2;
    y$ = src = Object.create({
      hidden: 43
    });
    y$.b = 3;
    y$.c = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    expect(res).toEqual({
      a: 1,
      b: 3,
      c: 4
    });
    return expect(res.hidden).toEqual(void 8);
  });
  test('discards non-own vals 2', function(){
    var x$, tgt, y$, src, res;
    x$ = tgt = Object.create({
      hidden: 42
    });
    x$.a = 1;
    x$.b = 2;
    y$ = src = Object.create({});
    y$.b = 3;
    y$.c = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    expect(res).toEqual({
      a: 1,
      b: 3,
      c: 4
    });
    return expect(res.hidden).toEqual(void 8);
  });
  return test('discards non-own vals 3', function(){
    var x$, tgt, y$, src, res;
    x$ = tgt = Object.create({});
    x$.a = 1;
    x$.b = 2;
    y$ = src = Object.create({
      hidden: 43
    });
    y$.b = 3;
    y$.c = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    expect(res).toEqual({
      a: 1,
      b: 3,
      c: 4
    });
    return expect(res.hidden).toEqual(void 8);
  });
});
describe('mergeToMut', function(){
  var fn, dir, mut;
  fn = mergeToMut;
  dir = 'to';
  mut = true;
  test(1, function(){
    var tgt, src, res;
    tgt = {
      a: 1,
      b: 2
    };
    src = {
      b: 3,
      c: 4
    };
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual({
      a: 1,
      b: 3,
      c: 4
    });
  });
  test('discards non-own on src', function(){
    var x$, tgt, y$, src, res;
    x$ = tgt = Object.create({});
    x$.a = 1;
    x$.b = 2;
    y$ = src = Object.create({
      hidden: 43
    });
    y$.b = 3;
    y$.c = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    expect(res).toEqual({
      a: 1,
      b: 3,
      c: 4
    });
    return expect(res.hidden).toEqual(void 8);
  });
  test('discards non-own on src, retains on tgt', function(){
    var x$, tgt, y$, src, res;
    x$ = tgt = Object.create({
      hidden: 42
    });
    x$.a = 1;
    x$.b = 2;
    y$ = src = Object.create({});
    y$.b = 3;
    y$.c = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    expect(res).toEqual({
      a: 1,
      b: 3,
      c: 4
    });
    return expect(res.hidden).toEqual(42);
  });
  return test('discards non-own vals 3', function(){
    var x$, tgt, y$, src, res;
    x$ = tgt = Object.create({
      hidden: 42
    });
    x$.a = 1;
    x$.b = 2;
    y$ = src = Object.create({
      hidden: 43
    });
    y$.b = 3;
    y$.c = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual({
      a: 1,
      b: 3,
      c: 4
    });
  });
});
describe('mergeFromMut', function(){
  var fn, dir, mut;
  fn = mergeFromMut;
  dir = 'from';
  mut = true;
  test(1, function(){
    var tgt, src, res;
    tgt = {
      a: 1,
      b: 2
    };
    src = {
      b: 3,
      c: 4
    };
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual({
      a: 1,
      b: 3,
      c: 4
    });
  });
  test('discards non-own on src', function(){
    var x$, tgt, y$, src, res;
    x$ = tgt = Object.create({});
    x$.a = 1;
    x$.b = 2;
    y$ = src = Object.create({
      hidden: 43
    });
    y$.b = 3;
    y$.c = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    expect(res).toEqual({
      a: 1,
      b: 3,
      c: 4
    });
    return expect(res.hidden).toEqual(void 8);
  });
  test('discards non-own on src, retains on tgt', function(){
    var x$, tgt, y$, src, res;
    x$ = tgt = Object.create({
      hidden: 42
    });
    x$.a = 1;
    x$.b = 2;
    y$ = src = Object.create({});
    y$.b = 3;
    y$.c = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    expect(res).toEqual({
      a: 1,
      b: 3,
      c: 4
    });
    return expect(res.hidden).toEqual(42);
  });
  return test('discards non-own vals 3', function(){
    var x$, tgt, y$, src, res;
    x$ = tgt = Object.create({
      hidden: 42
    });
    x$.a = 1;
    x$.b = 2;
    y$ = src = Object.create({
      hidden: 43
    });
    y$.b = 3;
    y$.c = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual({
      a: 1,
      b: 3,
      c: 4
    });
  });
});
describe('mergeToIn', function(){
  var fn, dir, mut;
  fn = mergeToIn;
  dir = 'to';
  mut = false;
  test(1, function(){
    var x$, tgt, y$, src, res;
    x$ = tgt = Object.create({
      hidden: 42
    });
    x$.a = 1;
    x$.b = 2;
    y$ = src = Object.create({});
    y$.b = 3;
    y$.c = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual({
      a: 1,
      b: 3,
      c: 4,
      hidden: 42
    });
  });
  test(2, function(){
    var x$, tgt, y$, src, res;
    x$ = tgt = Object.create({});
    x$.a = 1;
    x$.b = 2;
    y$ = src = Object.create({
      hidden: 43
    });
    y$.b = 3;
    y$.c = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual({
      a: 1,
      b: 3,
      c: 4,
      hidden: 43
    });
  });
  return test(3, function(){
    var x$, tgt, y$, src, res;
    x$ = tgt = Object.create({
      hidden: 42
    });
    x$.a = 1;
    x$.b = 2;
    y$ = src = Object.create({
      hidden: 43
    });
    y$.b = 3;
    y$.c = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual({
      a: 1,
      b: 3,
      c: 4,
      hidden: 43
    });
  });
});
describe('mergeFromIn', function(){
  var fn, dir, mut;
  fn = mergeFromIn;
  dir = 'from';
  mut = false;
  test(1, function(){
    var x$, tgt, y$, src, res;
    x$ = tgt = Object.create({
      hidden: 42
    });
    x$.a = 1;
    x$.b = 2;
    y$ = src = Object.create({});
    y$.b = 3;
    y$.c = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual({
      a: 1,
      b: 3,
      c: 4,
      hidden: 42
    });
  });
  test(2, function(){
    var x$, tgt, y$, src, res;
    x$ = tgt = Object.create({});
    x$.a = 1;
    x$.b = 2;
    y$ = src = Object.create({
      hidden: 43
    });
    y$.b = 3;
    y$.c = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual({
      a: 1,
      b: 3,
      c: 4,
      hidden: 43
    });
  });
  return test(3, function(){
    var x$, tgt, y$, src, res;
    x$ = tgt = Object.create({
      hidden: 42
    });
    x$.a = 1;
    x$.b = 2;
    y$ = src = Object.create({
      hidden: 43
    });
    y$.b = 3;
    y$.c = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual({
      a: 1,
      b: 3,
      c: 4,
      hidden: 43
    });
  });
});
describe('mergeToInMut', function(){
  var fn, dir, mut;
  fn = mergeToInMut;
  dir = 'to';
  mut = true;
  test(1, function(){
    var x$, tgt, y$, src, res;
    x$ = tgt = Object.create({
      hidden: 42
    });
    x$.a = 1;
    x$.b = 2;
    y$ = src = Object.create({});
    y$.b = 3;
    y$.c = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    expect(res).toEqual({
      a: 1,
      b: 3,
      c: 4
    });
    return expect(res.hidden).toEqual(42);
  });
  test(2, function(){
    var x$, tgt, y$, src, res;
    x$ = tgt = Object.create({});
    x$.a = 1;
    x$.b = 2;
    y$ = src = Object.create({
      hidden: 43
    });
    y$.b = 3;
    y$.c = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual({
      a: 1,
      b: 3,
      c: 4,
      hidden: 43
    });
  });
  return test(3, function(){
    var x$, tgt, y$, src, res;
    x$ = tgt = Object.create({
      hidden: 42
    });
    x$.a = 1;
    x$.b = 2;
    y$ = src = Object.create({
      hidden: 43
    });
    y$.b = 3;
    y$.c = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual({
      a: 1,
      b: 3,
      c: 4,
      hidden: 43
    });
  });
});
describe('mergeFromInMut', function(){
  var fn, dir, mut;
  fn = mergeFromInMut;
  dir = 'from';
  mut = true;
  test(1, function(){
    var x$, tgt, y$, src, res;
    x$ = tgt = Object.create({
      hidden: 42
    });
    x$.a = 1;
    x$.b = 2;
    y$ = src = Object.create({});
    y$.b = 3;
    y$.c = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    expect(res).toEqual({
      a: 1,
      b: 3,
      c: 4
    });
    return expect(res.hidden).toEqual(42);
  });
  test(2, function(){
    var x$, tgt, y$, src, res;
    x$ = tgt = Object.create({});
    x$.a = 1;
    x$.b = 2;
    y$ = src = Object.create({
      hidden: 43
    });
    y$.b = 3;
    y$.c = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual({
      a: 1,
      b: 3,
      c: 4,
      hidden: 43
    });
  });
  return test(3, function(){
    var x$, tgt, y$, src, res;
    x$ = tgt = Object.create({
      hidden: 42
    });
    x$.a = 1;
    x$.b = 2;
    y$ = src = Object.create({
      hidden: 43
    });
    y$.b = 3;
    y$.c = 4;
    res = run({
      fn: fn,
      src: src,
      tgt: tgt,
      dir: dir
    });
    testMut({
      res: res,
      mut: mut,
      tgt: tgt
    });
    return expect(res).toEqual({
      a: 1,
      b: 3,
      c: 4,
      hidden: 43
    });
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
      return toEqual(43)(
      expect(ten + twelve + nineteen + two));
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
      return toEqual(48)(
      expect(ten + twelve + nineteen + two + five));
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
      return laatStar(refs, array);
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
    return toEqual(['thing', 'thing', 'thing', 'thing', 'thing'])(
    expect(
    repeat(5)(
    'thing')));
  });
});
describe('times', function(){
  var thing;
  thing = function(i){
    return i;
  };
  return test(1, function(){
    return toEqual([0, 1, 2, 3, 4])(
    expect(
    times(5)(
    thing)));
  });
});
describe('compact*', function(){
  var mixed, falsey, truthy;
  mixed = [1, '', 0, '0', void 8, false, true, 2];
  falsey = [false, void 8, null, '', 0, NaN];
  truthy = [true, '0', [], {}, -1, Infinity];
  describe('compact', function(){
    test(1, function(){
      return toEqual([1, '0', true, 2])(
      expect(
      compact(
      mixed)));
    });
    test('all falsey', function(){
      return toEqual([])(
      expect(
      compact(
      falsey)));
    });
    return test('all truthy', function(){
      return toEqual(truthy)(
      expect(
      compact(
      truthy)));
    });
  });
  return describe('compactOk', function(){
    test(1, function(){
      return toEqual([1, '', 0, '0', false, true, 2])(
      expect(
      compactOk(
      mixed)));
    });
    test('all falsey', function(){
      return toEqual([false, '', 0, NaN])(
      expect(
      compactOk(
      falsey)));
    });
    return test('all truthy', function(){
      return toEqual(truthy)(
      expect(
      compactOk(
      truthy)));
    });
  });
});
describe('sprintf*', function(){
  describe('sprintf1', function(){
    test(1, function(){
      return toEqual('my name is dog')(
      expect(
      sprintf1('my name is %s')(
      'dog')));
    });
    return test(2, function(){
      return toEqual('my name is 3.33')(
      expect(
      sprintf1('my name is %0.2f')(
      10 / 3)));
    });
  });
  return describe('sprintfn', function(){
    test(1, function(){
      return toEqual('my name is not dog')(
      expect(
      sprintfN('my name %s not %s')(
      ['is', 'dog'])));
    });
    return test(2, function(){
      return toEqual('my name is 3.33')(
      expect(
      sprintfN('my name %s %0.2f')(
      ['is', 10 / 3])));
    });
  });
});
describe('try/catch', function(){
  var danger, safe;
  danger = function(){
    throw new Error;
  };
  safe = function(){
    return 99;
  };
  test('should fail', function(){
    var x$, catcher;
    x$ = catcher = jest.fn();
    x$.mockReturnValue(10);
    return toEqual(10)(
    expect(
    tryCatch(danger, catcher)));
  });
  return test('should succeed', function(){
    var x$, catcher;
    x$ = catcher = jest.fn();
    x$.mockReturnValue(10);
    return toEqual(99)(
    expect(
    tryCatch(safe, catcher)));
  });
});
describe('dot*', function(){
  var obj;
  obj = {
    name: 'dog',
    bark: function(){
      return 'rough';
    },
    speak: function(word){
      return ("my " + word + " is ") + this.name;
    },
    jump: function(where, howHigh){
      return "jumping " + howHigh + " " + where;
    },
    garble: function(){
      var all, res$, i$, to$;
      res$ = [];
      for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      all = res$;
      return join('!')(
      all);
    }
  };
  describe('aliases', function(){
    var normal, mut, names;
    normal = [dot, dot1, dot2, dot3, dotN];
    mut = [dotMut, dot1Mut, dot2Mut, dot3Mut, dotNMut];
    names = ['dot-mut', 'dot1-mut', 'dot2-mut', 'dot3-mut', 'dot-n-mut'];
    return each(function(arg$){
      var aliasL, aliasR, name;
      aliasL = arg$[0], aliasR = arg$[1], name = arg$[2];
      return test(name, function(){
        return expect(aliasL).toBe(aliasR);
      });
    })(
    zipAll(normal, mut, names));
  });
  describe('dot', function(){
    var trim, bark;
    trim = dot('trim');
    bark = dot('bark');
    test('string', function(){
      return expectToEqual('dog')(
      trim(
      ' dog '));
    });
    test('user obj', function(){
      return expectToEqual('rough')(
      bark(
      obj));
    });
    return test('array', function(){
      return expectToEqual(1)(
      dotMut('shift')(
      [1, 2, 3, 4]));
    });
  });
  describe('dot1', function(){
    var speak;
    speak = dot1('speak');
    test('string', function(){
      return expectToEqual('dogs')(
      dot1('concat', 's')(
      'dog'));
    });
    return test('user-obj', function(){
      return expectToEqual('my name is dog')(
      speak('name')(
      obj));
    });
  });
  describe('dot2', function(){
    var jump;
    jump = dot2('jump');
    test('string', function(){
      return expectToEqual('doggies')(
      dot2('concat', 'gie', 's')(
      'dog'));
    });
    return test('user-obj', function(){
      return expectToEqual('jumping 3m up')(
      jump('up', '3m')(
      obj));
    });
  });
  describe('dot3', function(){
    var garble;
    garble = dot3('garble');
    test('string', function(){
      return expectToEqual('doggies')(
      dot3('concat', 'g', 'ie', 's')(
      'dog'));
    });
    return test('user-obj', function(){
      return expectToEqual('a!b!c')(
      garble('a', 'b', 'c')(
      obj));
    });
  });
  describe('dotN', function(){
    var garble;
    garble = dotN('garble');
    test('string', function(){
      return expectToEqual('doggies')(
      dotN('concat', ['g', 'ie', 's'])(
      'dog'));
    });
    return test('user-obj', function(){
      return expectToEqual('a!b!c!d')(
      garble(['a', 'b', 'c', 'd'])(
      obj));
    });
  });
  return describe('dots combine', function(){
    return test(1, function(){
      return expectToEqual('loggies')(
      dotN('replace', [
        'o', function(){
          return 'lo';
        }
      ])(
      dot3('concat', 'g', 'i', 'es')(
      dot2('slice', 1, 3)(
      dot1('concat', 'g')(
      dot('trim')(
      ' dog '))))));
    });
  });
});
describe('tapMut, tapDot*', function(){
  var log, obj;
  beforeEach(function(){
    log = jest.fn();
    return obj = {
      name: 'cat',
      'get-name': function(){
        return this.name;
      },
      'reverse-name-mut': function(){
        return this.name = reverse(this.name);
      },
      'bark-io': function(){
        return log('rough');
      },
      'speak-io': function(word){
        return log(word);
      },
      jump: function(where, howHigh){
        return "jumping " + howHigh + " " + where;
      },
      garble: function(){
        var all, res$, i$, to$;
        res$ = [];
        for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
          res$.push(arguments[i$]);
        }
        all = res$;
        return log(join('!', all));
      }
    };
  });
  describe('aliases', function(){
    var normal, mut, names;
    normal = [tap, tapDot, tapDot1, tapDot2, tapDot3, tapDotN];
    mut = [tapMut, tapDotMut, tapDot1Mut, tapDot2Mut, tapDot3Mut, tapDotNMut];
    names = ['tap-mut', 'tap-dot-mut', 'tap-dot1-mut', 'tap-dot2-mut', 'tap-dot3-mut', 'tap-dot-n-mut'];
    return each(function(arg$){
      var aliasL, aliasR, name;
      aliasL = arg$[0], aliasR = arg$[1], name = arg$[2];
      return test(name, function(){
        return expect(aliasL).toBe(aliasR);
      });
    })(
    zipAll(normal, mut, names));
  });
  describe('tapMut', function(){
    return test('array', function(){
      return expectToEqual([1, 2, 3, 4, 5])(
      tapMut(function(x){
        return x.unshift(1);
      })(
      tapMut(function(x){
        return x.push(5);
      })(
      [2, 3, 4])));
    });
  });
  describe('tapDot', function(){
    test('array 1', function(){
      return expectToEqual([2, 3, 4])(
      tapDotMut('shift')(
      [1, 2, 3, 4]));
    });
    test('array 2', function(){
      return expectToEqual([4, 3, 2, 1])(
      tapDotMut('reverse')(
      [1, 2, 3, 4]));
    });
    return test('user-obj', function(){
      expectToEqual('tac')(
      dot('get-name')(
      tapDotMut('reverse-name-mut')(
      tapDot('bark-io')(
      obj))));
      return expectToEqual(1)(
      log.mock.calls.length);
    });
  });
  describe('tapDot1', function(){
    test('array', function(){
      return expectToEqual([1, 2, 3, 4])(
      tapDot1('concat', 5)(
      [1, 2, 3, 4]));
    });
    return test('user-obj', function(){
      expectToBe(obj)(
      tapDot1('speak-io', 'hello')(
      obj));
      return expectToEqual([['hello']])(
      log.mock.calls);
    });
  });
  describe('tapDot2', function(){
    test('array', function(){
      return expectToEqual([1, 2, 3, 4])(
      tapDot2('concat', 5, 6)(
      [1, 2, 3, 4]));
    });
    return test('user-obj', function(){
      expectToBe(obj)(
      tapDot2('garble', 'hello', 'goodbye')(
      obj));
      return expectToEqual([['hello!goodbye']])(
      log.mock.calls);
    });
  });
  describe('tapDot3', function(){
    test('array', function(){
      return expectToEqual([1, 2, 3, 4])(
      tapDot3('concat', 5, 6, 7)(
      [1, 2, 3, 4]));
    });
    return test('user-obj', function(){
      expectToBe(obj)(
      tapDot3('garble', 'hello', 'goodbye', 'hello')(
      obj));
      return expectToEqual([['hello!goodbye!hello']])(
      log.mock.calls);
    });
  });
  describe('tapDotN', function(){
    test('array', function(){
      return expectToEqual([1, 2, 3, 4])(
      tapDotN('concat', [1, 2, 3])(
      [1, 2, 3, 4]));
    });
    return test('user-obj', function(){
      expectToBe(obj)(
      tapDotN('garble', ['hello', 'goodbye', 'hello'])(
      obj));
      return expectToEqual([['hello!goodbye!hello']])(
      log.mock.calls);
    });
  });
  describe('tapDot combine', function(){
    return test('array', function(){
      return expectToEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])(
      tapDot1Mut('unshift', 1)(
      tapDotNMut('push', [11, 12])(
      tapDot3Mut('push', 8, 9, 10)(
      tapDot2Mut('push', 6, 7)(
      tapDot1Mut('push', 5)(
      [2, 3, 4]))))));
    });
  });
  describe('tapDot', function(){
    test('array', function(){});
    return test('user-obj', function(){});
  });
  describe('tapDot', function(){
    test('array', function(){});
    return test('user-obj', function(){});
  });
  describe('tapDot', function(){
    test('array', function(){});
    return test('user-obj', function(){});
  });
  describe('tapDot', function(){
    test('array', function(){});
    return test('user-obj', function(){});
  });
  return describe('tapDot', function(){
    test('array', function(){});
    return test('user-obj', function(){});
  });
});
describe('bitwise', function(){
  describe('bitwiseAnd', function(){
    test(1, function(){
      return expectToEqual(3)(
      bitwiseAnd(7, 3));
    });
    return test('curried', function(){
      return expectToEqual(3)(
      bitwiseAnd(7)(
      3));
    });
  });
  describe('bitwiseOr', function(){
    test(1, function(){
      return expectToEqual(7)(
      bitwiseOr(7, 3));
    });
    return test('curried', function(){
      return expectToEqual(7)(
      bitwiseOr(7)(
      3));
    });
  });
  describe('bitwiseXor', function(){
    test(1, function(){
      return expectToEqual(4)(
      bitwiseXor(7, 3));
    });
    test(2, function(){
      return expectToEqual(6)(
      bitwiseXor(7, 1));
    });
    return test('curried', function(){
      return expectToEqual(4)(
      bitwiseXor(7)(
      3));
    });
  });
  describe('bitwiseNot', function(){
    var niet;
    niet = function(x){
      return -(x + 1);
    };
    test(1, function(){
      return expectToEqual(niet(7))(
      bitwiseNot(7));
    });
    return test(2, function(){
      return expectToEqual(niet(4))(
      bitwiseNot(4));
    });
  });
  describe('bitwiseLeft', function(){
    test(1, function(){
      return expectToEqual(14)(
      bitwiseLeft(7, 1));
    });
    test(2, function(){
      return expectToEqual(20)(
      bitwiseLeft(5, 2));
    });
    return test('curried', function(){
      return expectToEqual(14)(
      bitwiseLeft(7)(
      1));
    });
  });
  describe('bitwiseRight', function(){
    test(1, function(){
      return expectToEqual(7)(
      bitwiseRight(14, 1));
    });
    test(2, function(){
      return expectToEqual(5)(
      bitwiseRight(20, 2));
    });
    test(3, function(){
      return expectToEqual(-4)(
      bitwiseRight(-7, 1));
    });
    return test('curried', function(){
      return expectToEqual(7)(
      bitwiseRight(14)(
      1));
    });
  });
  describe('bitwiseRightZeroFill', function(){
    test(1, function(){
      return expectToEqual(7)(
      bitwiseRightZeroFill(14, 1));
    });
    test(2, function(){
      return expectToEqual(5)(
      bitwiseRightZeroFill(20, 2));
    });
    test(3, function(){
      return expectToEqual(2147483644)(
      bitwiseRightZeroFill(-7, 1));
    });
    return test('curried', function(){
      return expectToEqual(7)(
      bitwiseRightZeroFill(14)(
      1));
    });
  });
  return describe('combine', function(){
    return test(1, function(){
      var i;
      i = 12345;
      return expectToEqual(bitwiseNot(i))(
      bitwiseXor(i)(
      -1));
    });
  });
});
/*
a = [1 2 3]
b = ['one' 'two']
c = ['un' 'deux' 'trois']

zip-all a, b, c
|> console.log
*/
function bind$(obj, key, target){
  return function(){ return (target || obj)[key].apply(obj, arguments) };
}
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
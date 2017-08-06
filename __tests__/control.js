var ref$, assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, join, split, rProp, rPath, rDefaultTo, curry, each, complement, isNil, rRepeat, rTimes, reverse, tap, flip, zip, array, test, xtest, expectToEqual, expectToBe, ifTrue, condTrue, ifTrueRF, tryCatch;
ref$ = require('ramda'), assoc = ref$.assoc, assocPath = ref$.assocPath, head = ref$.head, tail = ref$.tail, reduceRight = ref$.reduceRight, chain = ref$.chain, identity = ref$.identity, reduce = ref$.reduce, map = ref$.map, filter = ref$.filter, join = ref$.join, split = ref$.split, rProp = ref$.prop, rPath = ref$.path, rDefaultTo = ref$.defaultTo, curry = ref$.curry, each = ref$.forEach, complement = ref$.complement, isNil = ref$.isNil, rRepeat = ref$.repeat, rTimes = ref$.times, reverse = ref$.reverse, tap = ref$.tap, flip = ref$.flip, zip = ref$.zip;
ref$ = require('./common'), array = ref$.array, test = ref$.test, xtest = ref$.xtest, expectToEqual = ref$.expectToEqual, expectToBe = ref$.expectToBe;
ref$ = require('../lib/index'), ifTrue = ref$.ifTrue, condTrue = ref$.condTrue, ifTrueRF = ref$.ifTrueRF, tryCatch = ref$.tryCatch;
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
    return expectToEqual(10)(
    tryCatch(danger, catcher));
  });
  return test('should succeed', function(){
    var x$, catcher;
    x$ = catcher = jest.fn();
    x$.mockReturnValue(10);
    return expectToEqual(99)(
    tryCatch(safe, catcher));
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
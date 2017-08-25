var ref$, assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, join, split, rProp, rPath, rDefaultTo, curry, each, complement, isNil, rRepeat, rTimes, reverse, tap, flip, zip, arrayLs, test, xtest, expectToEqual, expectToBe, ifTrue, whenTrue, ifTrue__, tryCatch, doTestDoubleArm, doTestSingleArm;
ref$ = require('ramda'), assoc = ref$.assoc, assocPath = ref$.assocPath, head = ref$.head, tail = ref$.tail, reduceRight = ref$.reduceRight, chain = ref$.chain, identity = ref$.identity, reduce = ref$.reduce, map = ref$.map, filter = ref$.filter, join = ref$.join, split = ref$.split, rProp = ref$.prop, rPath = ref$.path, rDefaultTo = ref$.defaultTo, curry = ref$.curry, each = ref$.forEach, complement = ref$.complement, isNil = ref$.isNil, rRepeat = ref$.repeat, rTimes = ref$.times, reverse = ref$.reverse, tap = ref$.tap, flip = ref$.flip, zip = ref$.zip;
ref$ = require('./common'), arrayLs = ref$.arrayLs, test = ref$.test, xtest = ref$.xtest, expectToEqual = ref$.expectToEqual, expectToBe = ref$.expectToBe;
ref$ = require('../lib/index'), ifTrue = ref$.ifTrue, whenTrue = ref$.whenTrue, ifTrue__ = ref$.ifTrue__, tryCatch = ref$.tryCatch;
doTestDoubleArm = curry$(function(fn, arg$, arg1$){
  var curried, desc, inputVal, expectNumCalls, expectRet;
  curried = arg$.curried;
  desc = arg1$.desc, inputVal = arg1$.inputVal, expectNumCalls = arg1$.expectNumCalls, expectRet = arg1$.expectRet;
  return test(desc, function(){
    var ref$, jaVal, neeVal, x$, ja, y$, nee, ret;
    ref$ = [42, 43], jaVal = ref$[0], neeVal = ref$[1];
    x$ = ja = jest.fn();
    x$.mockReturnValue(jaVal);
    y$ = nee = jest.fn();
    y$.mockReturnValue(neeVal);
    ret = curried
      ? fn(ja, nee)(
      inputVal)
      : fn(ja, nee, inputVal);
    expect(ja.mock.calls.length).toEqual(
    expectNumCalls[0]);
    expect(nee.mock.calls.length).toEqual(
    expectNumCalls[1]);
    return expect(ret).toEqual(
    expectRet);
  });
});
doTestSingleArm = curry$(function(fn, arg$, arg1$){
  var curried, desc, inputVal, expectNumCalls, expectRet;
  curried = arg$.curried;
  desc = arg1$.desc, inputVal = arg1$.inputVal, expectNumCalls = arg1$.expectNumCalls, expectRet = arg1$.expectRet;
  return test(desc, function(){
    var jaVal, x$, ja, ret;
    jaVal = 42;
    x$ = ja = jest.fn();
    x$.mockReturnValue(jaVal);
    ret = curried
      ? fn(ja)(
      inputVal)
      : fn(ja, inputVal);
    expect(ja.mock.calls.length).toEqual(
    expectNumCalls);
    expect(ret).toEqual(
    expectRet);
    return expect(ret).toEqual(expectRet);
  });
});
describe('whenTrue', function(){
  var doTest, tests;
  doTest = doTestSingleArm;
  tests = arrayLs({
    desc: 'true',
    inputVal: true,
    expectNumCalls: 1,
    expectRet: 42
  }, {
    desc: 'false',
    inputVal: false,
    expectNumCalls: 0,
    expectRet: void 8
  }, {
    desc: 'empty string',
    inputVal: '',
    expectNumCalls: 0,
    expectRet: void 8
  }, {
    desc: 'undefined',
    inputVal: void 8,
    expectNumCalls: 0,
    expectRet: void 8
  });
  return each(doTest(whenTrue, {
    curried: true
  }))(
  tests);
});
describe('ifTrue', function(){
  var doTest, tests;
  doTest = doTestDoubleArm;
  tests = arrayLs({
    desc: 'true',
    inputVal: true,
    expectNumCalls: [1, 0],
    expectRet: 42
  }, {
    desc: 'false',
    inputVal: false,
    expectNumCalls: [0, 1],
    expectRet: 43
  }, {
    desc: 'empty string',
    inputVal: '',
    expectNumCalls: [0, 1],
    expectRet: 43
  });
  return each(doTest(ifTrue, {
    curried: true
  }))(
  tests);
});
describe('ifTrue__', function(){
  var fn, tests;
  fn = ifTrue__;
  tests = arrayLs({
    desc: 'true',
    inputVal: true,
    doNee: true,
    arms: 2,
    expectNumCalls: [1, 0],
    expectRet: 42
  }, {
    desc: 'true, no else',
    inputVal: true,
    arms: 1,
    expectNumCalls: [1, 0],
    expectRet: 42
  }, {
    desc: 'false',
    inputVal: false,
    arms: 2,
    expectNumCalls: [0, 1],
    expectRet: 43
  }, {
    desc: 'false, no else',
    inputVal: false,
    arms: 1,
    expectNumCalls: [0, 0],
    expectRet: void 8
  });
  return each(function(spec){
    var arms, ref$, doTest;
    arms = (ref$ = spec.arms, delete spec.arms, ref$);
    doTest = arms === 2 ? doTestDoubleArm : doTestSingleArm;
    return doTest(fn({
      curried: false
    }))(spec);
  })(
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
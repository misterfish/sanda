var ref$, assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, join, split, rProp, rPath, rDefaultTo, curry, each, complement, isNil, rRepeat, rTimes, reverse, tap, flip, zip, arrayLs, test, xtest, expectToEqual, expectToBe, whenTrue, ifTrue, ifTrue__, whenFunction, ifFunction, ifFunction__, doTests, doTestDoubleArm, doTestSingleArm;
ref$ = require('ramda'), assoc = ref$.assoc, assocPath = ref$.assocPath, head = ref$.head, tail = ref$.tail, reduceRight = ref$.reduceRight, chain = ref$.chain, identity = ref$.identity, reduce = ref$.reduce, map = ref$.map, filter = ref$.filter, join = ref$.join, split = ref$.split, rProp = ref$.prop, rPath = ref$.path, rDefaultTo = ref$.defaultTo, curry = ref$.curry, each = ref$.forEach, complement = ref$.complement, isNil = ref$.isNil, rRepeat = ref$.repeat, rTimes = ref$.times, reverse = ref$.reverse, tap = ref$.tap, flip = ref$.flip, zip = ref$.zip;
ref$ = require('./common'), arrayLs = ref$.arrayLs, test = ref$.test, xtest = ref$.xtest, expectToEqual = ref$.expectToEqual, expectToBe = ref$.expectToBe;
ref$ = require('../lib/index'), whenTrue = ref$.whenTrue, ifTrue = ref$.ifTrue, ifTrue__ = ref$.ifTrue__, whenFunction = ref$.whenFunction, ifFunction = ref$.ifFunction, ifFunction__ = ref$.ifFunction__;
doTests = curry$(function(describeSpec, tests){
  return each(function(testSpec){
    var numArms, ref$, ref1$, theTest;
    numArms = (ref$ = (ref1$ = testSpec.numArms, delete testSpec.numArms, ref1$)) != null ? ref$ : 1;
    theTest = numArms === 2 ? doTestDoubleArm : doTestSingleArm;
    return theTest(describeSpec, testSpec);
  })(
  tests);
});
doTestDoubleArm = curry$(function(arg$, arg1$){
  var fn, is__, desc, inputVal, expectBranch;
  fn = arg$.fn, is__ = arg$.is__;
  desc = arg1$.desc, inputVal = arg1$.inputVal, expectBranch = arg1$.expectBranch;
  return test(desc, function(){
    var ref$, jaVal, neeVal, x$, ja, y$, nee, ret, expectedRet, expectedCallsJa, expectedCallsNee;
    ref$ = [42, 43], jaVal = ref$[0], neeVal = ref$[1];
    x$ = ja = jest.fn();
    x$.mockReturnValue(jaVal);
    y$ = nee = jest.fn();
    y$.mockReturnValue(neeVal);
    ret = !is__
      ? fn(ja, nee)(
      inputVal)
      : fn(inputVal, ja, nee);
    ref$ = expectBranch === 'ja'
      ? [jaVal, 1, 0]
      : [neeVal, 0, 1], expectedRet = ref$[0], expectedCallsJa = ref$[1], expectedCallsNee = ref$[2];
    expect(ja.mock.calls.length).toEqual(
    expectedCallsJa);
    expect(nee.mock.calls.length).toEqual(
    expectedCallsNee);
    return expectToEqual(expectedRet)(
    ret);
  });
});
doTestSingleArm = curry$(function(arg$, arg1$){
  var fn, is__, desc, inputVal, expectBranch;
  fn = arg$.fn, is__ = arg$.is__;
  desc = arg1$.desc, inputVal = arg1$.inputVal, expectBranch = arg1$.expectBranch;
  return test(desc, function(){
    var ref$, jaVal, neeVal, x$, ja, ret, expectedRet, expectedCallsJa;
    ref$ = [42, void 8], jaVal = ref$[0], neeVal = ref$[1];
    x$ = ja = jest.fn();
    x$.mockReturnValue(jaVal);
    ret = !is__
      ? fn(ja)(
      inputVal)
      : fn(inputVal, ja);
    ref$ = expectBranch === 'ja'
      ? [jaVal, 1]
      : [neeVal, 0], expectedRet = ref$[0], expectedCallsJa = ref$[1];
    expect(ja.mock.calls.length).toEqual(
    expectedCallsJa);
    return expectToEqual(expectedRet)(
    ret);
  });
});
describe('whenTrue', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: whenTrue,
    is__: false
  };
  tests = arrayLs({
    desc: 'true',
    inputVal: true,
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: 'false',
    inputVal: false,
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'empty string',
    inputVal: '',
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'undefined',
    inputVal: void 8,
    expectBranch: 'nee',
    numArms: 1
  });
  return doTests(describeSpec, tests);
});
describe('ifTrue', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifTrue,
    is__: false
  };
  tests = arrayLs({
    desc: 'true',
    inputVal: true,
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'false',
    inputVal: false,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'empty string',
    inputVal: '',
    expectBranch: 'nee',
    numArms: 2
  });
  return doTests(describeSpec, tests);
});
describe('ifTrue__', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifTrue__,
    is__: true
  };
  tests = arrayLs({
    desc: 'true',
    inputVal: true,
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'true, no else',
    inputVal: true,
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: 'false',
    inputVal: false,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'false, no else',
    inputVal: false,
    expectBranch: 'nee',
    numArms: 1
  });
  return doTests(describeSpec, tests);
});
describe('whenFunction', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: whenFunction,
    is__: false
  };
  tests = arrayLs({
    desc: 'function',
    inputVal: function(){},
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: 'false',
    inputVal: false,
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'empty string',
    inputVal: '',
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'undefined',
    inputVal: void 8,
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'array',
    inputVal: [],
    expectBranch: 'nee',
    numArms: 1
  });
  return doTests(describeSpec, tests);
});
describe('ifFunction', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifFunction,
    is__: false
  };
  tests = arrayLs({
    desc: 'function',
    inputVal: function(){},
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'false',
    inputVal: false,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'empty string',
    inputVal: '',
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'array',
    inputVal: [],
    expectBranch: 'nee',
    numArms: 2
  });
  return doTests(describeSpec, tests);
});
describe('ifFunction__', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifFunction__,
    is__: true
  };
  tests = arrayLs({
    desc: 'function',
    inputVal: function(){},
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'function, no else',
    inputVal: function(){},
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: 'false',
    inputVal: false,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'false, no else',
    inputVal: false,
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'array',
    inputVal: [],
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'array, no else',
    inputVal: [],
    expectBranch: 'nee',
    numArms: 1
  });
  return doTests(describeSpec, tests);
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
var ref$, assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, join, split, rProp, rPath, rDefaultTo, curry, each, complement, isNil, rRepeat, rTimes, reverse, tap, flip, zip, arrayLs, test, xtest, expectToEqual, expectToBe, ifCond, whenCond, ifCond__, ifOk, whenOk, ifOk__, ifTrue, whenTrue, ifTrue__, ifFalse, whenFalse, ifFalse__, ifYes, whenYes, ifYes__, ifNo, whenNo, ifNo__, ifFunction, whenFunction, ifFunction__, ifLengthOne, whenLengthOne, ifLengthOne__, ifEmpty, whenEmpty, ifEmpty__, doTests, doTestDoubleArm, doTestSingleArm;
ref$ = require('ramda'), assoc = ref$.assoc, assocPath = ref$.assocPath, head = ref$.head, tail = ref$.tail, reduceRight = ref$.reduceRight, chain = ref$.chain, identity = ref$.identity, reduce = ref$.reduce, map = ref$.map, filter = ref$.filter, join = ref$.join, split = ref$.split, rProp = ref$.prop, rPath = ref$.path, rDefaultTo = ref$.defaultTo, curry = ref$.curry, each = ref$.forEach, complement = ref$.complement, isNil = ref$.isNil, rRepeat = ref$.repeat, rTimes = ref$.times, reverse = ref$.reverse, tap = ref$.tap, flip = ref$.flip, zip = ref$.zip;
ref$ = require('./common'), arrayLs = ref$.arrayLs, test = ref$.test, xtest = ref$.xtest, expectToEqual = ref$.expectToEqual, expectToBe = ref$.expectToBe;
ref$ = require('../lib/index'), ifCond = ref$.ifCond, whenCond = ref$.whenCond, ifCond__ = ref$.ifCond__, ifOk = ref$.ifOk, whenOk = ref$.whenOk, ifOk__ = ref$.ifOk__, ifTrue = ref$.ifTrue, whenTrue = ref$.whenTrue, ifTrue__ = ref$.ifTrue__, ifFalse = ref$.ifFalse, whenFalse = ref$.whenFalse, ifFalse__ = ref$.ifFalse__, ifYes = ref$.ifYes, whenYes = ref$.whenYes, ifYes__ = ref$.ifYes__, ifNo = ref$.ifNo, whenNo = ref$.whenNo, ifNo__ = ref$.ifNo__, ifFunction = ref$.ifFunction, whenFunction = ref$.whenFunction, ifFunction__ = ref$.ifFunction__, ifLengthOne = ref$.ifLengthOne, whenLengthOne = ref$.whenLengthOne, ifLengthOne__ = ref$.ifLengthOne__, ifEmpty = ref$.ifEmpty, whenEmpty = ref$.whenEmpty, ifEmpty__ = ref$.ifEmpty__;
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
    expectToEqual(expectedCallsJa)(
    ja.mock.calls.length);
    expectToEqual(expectedCallsNee)(
    nee.mock.calls.length);
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
    expectToEqual(expectedCallsJa)(
    ja.mock.calls.length);
    return expectToEqual(expectedRet)(
    ret);
  });
});
describe('whenCond', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: whenCond,
    is__: false
  };
  tests = arrayLs({
    desc: 'true',
    inputVal: true,
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: '3',
    inputVal: 3,
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
    desc: 'null',
    inputVal: null,
    expectBranch: 'nee',
    numArms: 1
  });
  return doTests(describeSpec, tests);
});
describe('ifCond', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifCond,
    is__: false
  };
  tests = arrayLs({
    desc: 'true',
    inputVal: true,
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: '3',
    inputVal: 3,
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
    desc: 'undefined',
    inputVal: void 8,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'null',
    inputVal: null,
    expectBranch: 'nee',
    numArms: 2
  });
  return doTests(describeSpec, tests);
});
describe('ifCond__', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifCond__,
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
    desc: '3',
    inputVal: 3,
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: '3, no else',
    inputVal: 3,
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
    desc: 'undefined',
    inputVal: void 8,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'undefined, no else',
    inputVal: void 8,
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'null',
    inputVal: null,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'null, no else',
    inputVal: null,
    expectBranch: 'nee',
    numArms: 1
  });
  return doTests(describeSpec, tests);
});
describe('whenOk', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: whenOk,
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
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: 'empty string',
    inputVal: '',
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: 'undefined',
    inputVal: void 8,
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'null',
    inputVal: null,
    expectBranch: 'nee',
    numArms: 1
  });
  return doTests(describeSpec, tests);
});
describe('ifOk', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifOk,
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
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'empty string',
    inputVal: '',
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'undefined',
    inputVal: void 8,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'null',
    inputVal: null,
    expectBranch: 'nee',
    numArms: 2
  });
  return doTests(describeSpec, tests);
});
describe('ifOk__', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifOk__,
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
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'false, no else',
    inputVal: false,
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: 'undefined',
    inputVal: void 8,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'undefined, no else',
    inputVal: void 8,
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'null',
    inputVal: null,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'null, no else',
    inputVal: null,
    expectBranch: 'nee',
    numArms: 1
  });
  return doTests(describeSpec, tests);
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
    desc: '3',
    inputVal: 3,
    expectBranch: 'nee',
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
    desc: '3',
    inputVal: 3,
    expectBranch: 'nee',
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
    desc: '3',
    inputVal: 3,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: '3, no else',
    inputVal: 3,
    expectBranch: 'nee',
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
describe('whenFalse', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: whenFalse,
    is__: false
  };
  tests = arrayLs({
    desc: 'false',
    inputVal: false,
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: 'true',
    inputVal: true,
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
describe('ifFalse', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifFalse,
    is__: false
  };
  tests = arrayLs({
    desc: 'false',
    inputVal: false,
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'true',
    inputVal: true,
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
describe('ifFalse__', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifFalse__,
    is__: true
  };
  tests = arrayLs({
    desc: 'false',
    inputVal: false,
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'false, no else',
    inputVal: false,
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: 'true',
    inputVal: true,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'true, no else',
    inputVal: true,
    expectBranch: 'nee',
    numArms: 1
  });
  return doTests(describeSpec, tests);
});
describe('whenYes', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: whenYes,
    is__: false
  };
  tests = arrayLs({
    desc: 'true',
    inputVal: true,
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: '3',
    inputVal: 3,
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
describe('ifYes', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifYes,
    is__: false
  };
  tests = arrayLs({
    desc: 'true',
    inputVal: true,
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: '3',
    inputVal: 3,
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
    desc: 'undefined',
    inputVal: void 8,
    expectBranch: 'nee',
    numArms: 2
  });
  return doTests(describeSpec, tests);
});
describe('ifYes__', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifYes__,
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
    desc: '3',
    inputVal: 3,
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: '3, no else',
    inputVal: 3,
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
describe('whenNo', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: whenNo,
    is__: false
  };
  tests = arrayLs({
    desc: 'true',
    inputVal: true,
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'false',
    inputVal: false,
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: '3',
    inputVal: 3,
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'empty string',
    inputVal: '',
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: 'undefined',
    inputVal: void 8,
    expectBranch: 'ja',
    numArms: 1
  });
  return doTests(describeSpec, tests);
});
describe('ifNo', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifNo,
    is__: false
  };
  tests = arrayLs({
    desc: 'true',
    inputVal: true,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'false',
    inputVal: false,
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'empty string',
    inputVal: '',
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: '3',
    inputVal: 3,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'undefined',
    inputVal: void 8,
    expectBranch: 'ja',
    numArms: 2
  });
  return doTests(describeSpec, tests);
});
describe('ifNo__', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifNo__,
    is__: true
  };
  tests = arrayLs({
    desc: 'true',
    inputVal: true,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'true, no else',
    inputVal: true,
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'false',
    inputVal: false,
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'false, no else',
    inputVal: false,
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: 'empty string',
    inputVal: '',
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'empty string, no else',
    inputVal: '',
    expectBranch: 'ja',
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
describe('whenLengthOne', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: whenLengthOne,
    is__: false
  };
  tests = arrayLs({
    desc: 'array n = 1',
    inputVal: [9],
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: 'array n = 0',
    inputVal: [],
    expectBranch: 'nee',
    numArms: 1
  });
  return doTests(describeSpec, tests);
});
describe('ifLengthOne', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifLengthOne,
    is__: false
  };
  tests = arrayLs({
    desc: 'array n = 1',
    inputVal: [9],
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'array n = 0',
    inputVal: [],
    expectBranch: 'nee',
    numArms: 2
  });
  return doTests(describeSpec, tests);
});
describe('ifLengthOne__', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifLengthOne__,
    is__: true
  };
  tests = arrayLs({
    desc: 'array n = 1',
    inputVal: [9],
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'array n = 1, no else',
    inputVal: [9],
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: 'array n = 0',
    inputVal: [],
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'array n = 0, no else',
    inputVal: [],
    expectBranch: 'nee',
    numArms: 1
  });
  return doTests(describeSpec, tests);
});
describe('whenEmpty', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: whenEmpty,
    is__: false
  };
  tests = arrayLs({
    desc: 'array n = 1',
    inputVal: [9],
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'array n = 0',
    inputVal: [],
    expectBranch: 'ja',
    numArms: 1
  });
  return doTests(describeSpec, tests);
});
describe('ifEmpty', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifEmpty,
    is__: false
  };
  tests = arrayLs({
    desc: 'array n = 1',
    inputVal: [9],
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'array n = 0',
    inputVal: [],
    expectBranch: 'ja',
    numArms: 2
  });
  return doTests(describeSpec, tests);
});
describe('ifEmpty__', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifEmpty__,
    is__: true
  };
  tests = arrayLs({
    desc: 'array n = 1',
    inputVal: [9],
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'array n = 1, no else',
    inputVal: [9],
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'array n = 0',
    inputVal: [],
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'array n = 0, no else',
    inputVal: [],
    expectBranch: 'ja',
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
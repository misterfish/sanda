var ref$, assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, join, split, rProp, rPath, rDefaultTo, curry, each, complement, isNil, rRepeat, rTimes, reverse, tap, flip, zip, arrayLs, test, xtest, expectToEqual, expectToBe, tryCatch;
ref$ = require('ramda'), assoc = ref$.assoc, assocPath = ref$.assocPath, head = ref$.head, tail = ref$.tail, reduceRight = ref$.reduceRight, chain = ref$.chain, identity = ref$.identity, reduce = ref$.reduce, map = ref$.map, filter = ref$.filter, join = ref$.join, split = ref$.split, rProp = ref$.prop, rPath = ref$.path, rDefaultTo = ref$.defaultTo, curry = ref$.curry, each = ref$.forEach, complement = ref$.complement, isNil = ref$.isNil, rRepeat = ref$.repeat, rTimes = ref$.times, reverse = ref$.reverse, tap = ref$.tap, flip = ref$.flip, zip = ref$.zip;
ref$ = require('./common'), arrayLs = ref$.arrayLs, test = ref$.test, xtest = ref$.xtest, expectToEqual = ref$.expectToEqual, expectToBe = ref$.expectToBe;
tryCatch = require('../lib/index').tryCatch;
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
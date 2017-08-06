var ref$, assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, join, split, rProp, rPath, rDefaultTo, curry, each, complement, isNil, array, log, ifTrue;
ref$ = require('ramda'), assoc = ref$.assoc, assocPath = ref$.assocPath, head = ref$.head, tail = ref$.tail, reduceRight = ref$.reduceRight, chain = ref$.chain, identity = ref$.identity, reduce = ref$.reduce, map = ref$.map, filter = ref$.filter, join = ref$.join, split = ref$.split, rProp = ref$.prop, rPath = ref$.path, rDefaultTo = ref$.defaultTo, curry = ref$.curry, each = ref$.forEach, complement = ref$.complement, isNil = ref$.isNil;
array = Array;
log = bind$(console, 'log');
ifTrue = require('../lib/index').ifTrue;
describe('ifTrue', function(){
  return each(function(arg$){
    var desc, val, expectNumCalls;
    desc = arg$.desc, val = arg$.val, expectNumCalls = arg$.expectNumCalls;
    log(desc);
    return it(desc, function(){
      var ja;
      ja = jest.fn();
      ifTrue(ja)(
      val);
      return expect(ja.mock.calls.length).toEqual(expectNumCalls);
    });
  })(
  array({
    desc: 'true',
    val: true,
    expectNumCalls: 1
  }, {
    desc: 'false',
    val: false,
    expectNumCalls: 0
  }, {
    desc: 'false',
    val: false,
    expectNumCalls: 0
  }));
});
describe('condTrue', function(){
  return;
  return each(function(arg$){
    var desc, val, expectNumCalls;
    desc = arg$.desc, val = arg$.val, expectNumCalls = arg$.expectNumCalls;
    return it(desc, function(){
      var ja, nee;
      ja = jest.fn();
      nee = jest.fn();
      condTrue(ja)(
      val);
      return expect(ja.mock.calls.length).toEqual(expectNumCalls);
    });
  })(
  array({
    desc: 'true',
    val: true,
    expectNumCalls: [1, 0]
  }, {
    desc: 'false',
    val: false,
    expectNumCalls: [0, 1]
  }));
});
function bind$(obj, key, target){
  return function(){ return (target || obj)[key].apply(obj, arguments) };
}
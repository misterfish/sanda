var ref$, assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, join, split, rProp, rPath, rDefaultTo, curry, each, complement, isNil, rRepeat, rTimes, reverse, tap, flip, zip, arrayLs, test, xtest, expectToEqual, expectToBe, factory;
ref$ = require('ramda'), assoc = ref$.assoc, assocPath = ref$.assocPath, head = ref$.head, tail = ref$.tail, reduceRight = ref$.reduceRight, chain = ref$.chain, identity = ref$.identity, reduce = ref$.reduce, map = ref$.map, filter = ref$.filter, join = ref$.join, split = ref$.split, rProp = ref$.prop, rPath = ref$.path, rDefaultTo = ref$.defaultTo, curry = ref$.curry, each = ref$.forEach, complement = ref$.complement, isNil = ref$.isNil, rRepeat = ref$.repeat, rTimes = ref$.times, reverse = ref$.reverse, tap = ref$.tap, flip = ref$.flip, zip = ref$.zip;
ref$ = require('./common'), arrayLs = ref$.arrayLs, test = ref$.test, xtest = ref$.xtest, expectToEqual = ref$.expectToEqual, expectToBe = ref$.expectToBe;
factory = require('../lib/index').factory;
describe('factory ', function(){
  var prehistoricProto, animalProto, ref$, proto, create, redAnimal, blueAnimal;
  prehistoricProto = {
    ooze: function(){
      return 'ooze';
    }
  };
  animalProto = (ref$ = Object.create(prehistoricProto), ref$.walk = function(){
    return 'walk';
  }, ref$.confess = function(){
    return 'I am ' + this.color;
  }, ref$);
  ref$ = factory(animalProto), proto = ref$.proto, create = ref$.create;
  redAnimal = create({
    color: 'red'
  });
  blueAnimal = create({
    color: 'blue'
  });
  test(1, function(){
    expectToEqual('I am red')(
    redAnimal.confess());
    return expectToEqual('I am blue')(
    blueAnimal.confess());
  });
  return test('proto chain multi-level', function(){
    return expectToEqual('ooze')(
    redAnimal.ooze());
  });
});
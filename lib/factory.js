var ref$, assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, join, split, rProp, rPath, rDefaultTo, curry, each, complement, isNil, rRepeat, rTimes, reverse, tap, flip, zip, arrayLs, test, xtest, expectToEqual, expectToBe, factory;
ref$ = require('ramda'), assoc = ref$.assoc, assocPath = ref$.assocPath, head = ref$.head, tail = ref$.tail, reduceRight = ref$.reduceRight, chain = ref$.chain, identity = ref$.identity, reduce = ref$.reduce, map = ref$.map, filter = ref$.filter, join = ref$.join, split = ref$.split, rProp = ref$.prop, rPath = ref$.path, rDefaultTo = ref$.defaultTo, curry = ref$.curry, each = ref$.forEach, complement = ref$.complement, isNil = ref$.isNil, rRepeat = ref$.repeat, rTimes = ref$.times, reverse = ref$.reverse, tap = ref$.tap, flip = ref$.flip, zip = ref$.zip;
ref$ = require('./common'), arrayLs = ref$.arrayLs, test = ref$.test, xtest = ref$.xtest, expectToEqual = ref$.expectToEqual, expectToBe = ref$.expectToBe;
factory = require('../lib/index').factory;
describe('factory', function(){
  var Animal;
  Animal = {
    walk: function(){
      return 'walk';
    },
    confess: function(){
      return 'I am ' + this.color;
    }
  };
  return test(1, function(){
    var ref$, proto, create, redAnimal, blueAnimal;
    ref$ = factory(Animal), proto = ref$.proto, create = ref$.create;
    redAnimal = create({
      color: 'red'
    });
    blueAnimal = create({
      color: 'blue'
    });
    expectToEqual('I am red')(
    redAnimal.confess());
    return expectToEqual('I am red')(
    blueAnimal.confess());
  });
});
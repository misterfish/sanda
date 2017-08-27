var ref$, assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, join, split, rProp, rPath, rDefaultTo, curry, each, complement, isNil, rRepeat, rTimes, reverse, tap, flip, keys, zip, arrayLs, test, xtest, expectToEqual, expectToBe, factory, toString$ = {}.toString;
ref$ = require('ramda'), assoc = ref$.assoc, assocPath = ref$.assocPath, head = ref$.head, tail = ref$.tail, reduceRight = ref$.reduceRight, chain = ref$.chain, identity = ref$.identity, reduce = ref$.reduce, map = ref$.map, filter = ref$.filter, join = ref$.join, split = ref$.split, rProp = ref$.prop, rPath = ref$.path, rDefaultTo = ref$.defaultTo, curry = ref$.curry, each = ref$.forEach, complement = ref$.complement, isNil = ref$.isNil, rRepeat = ref$.repeat, rTimes = ref$.times, reverse = ref$.reverse, tap = ref$.tap, flip = ref$.flip, keys = ref$.keys, zip = ref$.zip;
ref$ = require('./common'), arrayLs = ref$.arrayLs, test = ref$.test, xtest = ref$.xtest, expectToEqual = ref$.expectToEqual, expectToBe = ref$.expectToBe;
factory = require('../lib/index').factory;
describe('factory ', function(){
  var prehistoricProto, animalProto, ref$;
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
  describe(1, function(){
    var ref$, proto, create;
    ref$ = factory(animalProto), proto = ref$.proto, create = ref$.create;
    test('main', function(){
      var redAnimal, blueAnimal;
      redAnimal = create({
        color: 'red'
      });
      blueAnimal = create({
        color: 'blue'
      });
      expectToEqual('I am red')(
      redAnimal.confess());
      return expectToEqual('I am blue')(
      blueAnimal.confess());
    });
    test('proto', function(){
      expectToEqual('Function')(
      toString$.call(proto.ooze).slice(8, -1));
      expectToEqual('Function')(
      toString$.call(proto.walk).slice(8, -1));
      return expectToEqual('Function')(
      toString$.call(proto.confess).slice(8, -1));
    });
    test('instance spec not altered', function(){
      var instanceSpec, redAnimal;
      instanceSpec = {
        color: 'red'
      };
      redAnimal = create(instanceSpec);
      return expectToEqual({
        color: 'red'
      })(
      instanceSpec);
    });
    return test('proto chain multi-level', function(){
      var redAnimal;
      redAnimal = create({
        color: 'red'
      });
      return expectToEqual('ooze')(
      redAnimal.ooze());
    });
  });
  describe('mixins pre', function(){
    var hopper, topper, walker, ref$, proto, create, redAnimal;
    hopper = {
      hop: function(){
        return 'hopper hop';
      }
    };
    topper = {
      hop: function(){
        return 'topper hop';
      },
      top: function(){
        return 'topper top';
      }
    };
    walker = {
      pop: function(){
        return 'walker pop';
      },
      walk: function(){
        return 'walker walk';
      }
    };
    ref$ = factory(animalProto, [hopper, topper, walker]), proto = ref$.proto, create = ref$.create;
    redAnimal = create({
      color: 'red'
    });
    test('mixins pre, right order', function(){
      expectToEqual('I am red')(
      redAnimal.confess());
      expectToEqual('topper hop')(
      redAnimal.hop());
      expectToEqual('topper top')(
      redAnimal.top());
      return expectToEqual('walker pop')(
      redAnimal.pop());
    });
    return test("mixins pre doesn't clobber", function(){
      return expectToEqual('walk')(
      redAnimal.walk());
    });
  });
  return describe('mixins pre', function(){
    var numKeys, hopper, topper, walker, ref$, proto, create, redAnimal, this$ = this;
    numKeys = compose$(keys, function(it){
      return it.length;
    });
    hopper = {
      hop: function(){
        return 'hopper hop';
      }
    };
    topper = {
      hop: function(){
        return 'topper hop';
      },
      top: function(){
        return 'topper top';
      }
    };
    walker = {
      pop: function(){
        return 'walker pop';
      },
      walk: function(){
        return 'walker walk';
      }
    };
    ref$ = factory(animalProto, [hopper, topper, walker]), proto = ref$.proto, create = ref$.create;
    redAnimal = create({
      color: 'red'
    });
    test('mixins pre, right order', function(){
      expectToEqual('I am red')(
      redAnimal.confess());
      expectToEqual('topper hop')(
      redAnimal.hop());
      expectToEqual('topper top')(
      redAnimal.top());
      return expectToEqual('walker pop')(
      redAnimal.pop());
    });
    test("mixins pre doesn't clobber", function(){
      return expectToEqual('walk')(
      redAnimal.walk());
    });
    return test('mixins not altered', function(){
      expectToEqual(1)(
      numKeys(hopper));
      expectToEqual(2)(
      numKeys(topper));
      return expectToEqual(2)(
      numKeys(walker));
    });
  });
});
function compose$() {
  var functions = arguments;
  return function() {
    var i, result;
    result = functions[0].apply(this, arguments);
    for (i = 1; i < functions.length; ++i) {
      result = functions[i](result);
    }
    return result;
  };
}
var assert = require('chai').assert;
var runes = require('../modules/runes');

describe('Array', function(){
  describe('#indexOf', function(){
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  })
})

describe('runes', function(){
  describe('the name property', function(){
    it('should be the name of the module', function(){
      assert.equal('runes', runes.name);
    })
  })

  describe('the getName func', function(){
    it('should return the name of the module', function(){
      assert.equal('runes', runes.getName());
    })
  })
})

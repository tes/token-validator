var TokenGen = require('../index');
var assert = require('chai').assert;

describe('token', function() {
  var t0 = 1458830867111;
  var duration = 3600000;

  it('should generate a token', function() {
    var token = new TokenGen('secret', duration, 10);
    assert.equal(token.generate(t0, 'hello!'), '97d1ccbcf9-2bbfa7');
  });

  it('should verify a token', function() {
    var token = new TokenGen('secret', duration, 10);
    assert.isTrue(token.verify(t0, 'hello!', '97d1ccbcf9-2bbfa7'));
  });

  it('should not verify a token with wrong string', function() {
    var token = new TokenGen('secret', duration, 10);
    assert.isFalse(token.verify(t0, 'hello', '97d1ccbcf9-2bbfa7'));
  });

  it('should verify a token within the expiration', function() {
    var token = new TokenGen('secret', duration, 10);
    assert.isTrue(token.verify(t0 + 100, 'hello!', '97d1ccbcf9-2bbfa7'));
  });

  it('should not verify a token just expired', function() {
    var token = new TokenGen('secret', duration, 10);
    assert.isFalse(token.verify(t0 + 3600000, 'hello!', '97d1ccbcf9-2bbfa7'));
  });

  it('should verify a token close to expiration', function() {
    var token = new TokenGen('secret', duration, 10);
    assert.isTrue(token.verify(t0 + 3599999, 'hello!', '97d1ccbcf9-2bbfa7'));
  });

  it('should generate a token without timestamp', function() {
    var token = new TokenGen('secret', duration, 10);
    assert.equal(token.generate(undefined, 'hello!'), '1bbd1a456e');
  });

  it('should verify a token without timestamp', function() {
    var token = new TokenGen('secret', duration, 10);
    assert.isTrue(token.verify(undefined, 'hello!', token.generate(undefined, 'hello!')));
  });
});

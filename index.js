var crypto = require('crypto');

function TokenGen(secret, duration, len) {
  this.secret = secret;
  this.duration = duration;
  this.len = len;
}

TokenGen.prototype.generate = function generate(ts, str) {
  var hmac = crypto.createHmac('sha256', this.secret);
  var token, t, rem;
  if (ts) {
    t = Math.floor(ts / this.duration);
    rem = ts % this.duration;
    hmac.update(str + t.toString() + rem.toString());
    token = hmac.digest('hex').slice(0, this.len) + '-' + rem.toString(16);
  } else {
    hmac.update(str);
    token = hmac.digest('hex').slice(0, this.len);
  }
  return token;
};

TokenGen.prototype.verify = function verify(ts, str, token) {
  var parts = token.split('-');
  var hash = parts[0];
  var remStr = parts[1];
  var hmac = crypto.createHmac('sha256', this.secret);
  var rem, fixedTs, t;
  if (ts) {
    rem = parseInt(remStr, 16);
    fixedTs = ts - rem;
    t = Math.floor(fixedTs / this.duration);
    hmac.update(str + t.toString() + rem.toString());
  } else {
    hmac.update(str);
  }
  return hmac.digest('hex').slice(0, this.len) === hash;
};

module.exports = TokenGen;

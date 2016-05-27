token-validator
===============
You can use it for generating a token that will validate a string (optionally with an expiration).

How it works
============
The token is formed by an hexadecimal hash and hexadecimal number, separated by a dash.
The number is used to check for the expiration time.
You can have a look at the algorithm in the source code, it is pretty simple.

How to use it
=============
First of all you have to set up your token-validator object:
```js
var TokenVal = require('token-validator');

var secret = 'I only know this';
var duration = 60  * 1000; // in ms
var len = 10; // the hash length
var tokenVal = new TokenVal(secret, duration, len);
```
Then you can generate a token:
```js
var token = tokenVal.generate(Date.now(), 'you cannot change this without invalidating the token');
```
and validating it in this way:
```js
var isValid = tokenVal.verify(Date.now(), 'you cannot change this without invalidating the token', token);
```
If the function is called within the duration of the token this will be valid.

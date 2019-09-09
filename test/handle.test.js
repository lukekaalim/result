// @flow strict
const { expect, expectAll, assert } = require('@lukekaalim/test');
const { handle } = require('../src/result');

const expectHandle = expectAll('handle() should allow simple and safe evaluation of result branches', [
]);

module.exports = {
  expectHandle,
};

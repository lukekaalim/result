// @flow strict
const { expectChain } = require('./chain.test');
const { expectHandle } = require('./handle.test');
const { expect, expectAll, assert } = require('@lukekaalim/test');

const expectResult = expectAll('Result.js should allow the creation, consumption, and control of the result data type', [
  expectChain,
  expectHandle,
]);

module.exports = {
  expectResult,
};

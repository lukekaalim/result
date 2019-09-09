// @flow strict
const { expect, expectAll, assert } = require('@lukekaalim/test');
const { handle, succeed, fail } = require('../src/result');

const expectHandleSuccess = expect(() => {
  const result = succeed('Succeeded Value');

  return assert('handle() should return whatever the onSuccess argument returns if the result is success',
    handle(result, () => 'success', () => 'failure') === 'success',
  );
});

const expectHandleFailure = expect(() => {
  const result = fail('Failed Value');

  return assert('handle() should return whatever the onFailure argument returns if the result is failure',
    handle(result, () => 'success', () => 'failure') === 'failure',
  );
});

const expectHandle = expectAll('handle() should allow simple and safe evaluation of result branches', [
  expectHandleSuccess,
  expectHandleFailure,
]);

module.exports = {
  expectHandle,
};

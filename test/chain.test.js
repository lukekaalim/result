// @flow strict
const { succeed, fail, chain } = require('../src/result');
const { expect, expectAll, assert } = require('@lukekaalim/test');

const expectChainResult = expect(() => {
  const initialResult = succeed('starting value');
  const result = chain(initialResult).result();
  
  return assert('chain().result should return the result of the chain\'s argument', result === initialResult);
});

const expectChainThen = expect(() => {
  const initialResult = succeed('starting value');
  const succeedResult = chain(initialResult)
    .then(() => succeed('succeed value'))
    .result();
  const failResult = chain(initialResult)
    .then(() => fail('fail value'))
    .result();
  
  return assert('chain().then should return a chain based off the provided func when the initial result succeeds', [
    assert('provided func retuning success returns the same success', succeedResult.type === 'success' && succeedResult.success === 'succeed value'),
    assert('provided func retuning failure returns the same failure', failResult.type === 'failure' && failResult.failure === 'fail value'),
  ]);
});

const expectChainCatch = expect(() => {
  const initialResult = fail('starting value');
  const succeedResult = chain(initialResult)
    .catch(() => succeed('succeed value'))
    .result();
  const failResult = chain(initialResult)
    .catch(() => fail('fail value'))
    .result();
  
  return assert('chain().catch should return a chain based off the provided func when the initial result fails', [
    assert('provided func retuning success returns the same success', succeedResult.type === 'success' && succeedResult.success === 'succeed value'),
    assert('provided func retuning failure returns the same failure', failResult.type === 'failure' && failResult.failure === 'fail value'),
  ]);
});

const expectChainPassThrough = expect(() => {
  const succeedResult = chain(succeed('starting value'))
    .catch(() => succeed('catch value'))
    .result();
  const failResult = chain(fail('starting value'))
    .then(() => succeed('then value'))
    .result();

  return assert('chain().catch and chain().then should fall through and return the original chain if they didn\'t match', [
    assert('chain().catch doesnt return result if chain is success', succeedResult.type === 'success' && succeedResult.success === 'starting value'),
    assert('chain().then doesnt return result if chain is failure', failResult.type === 'failure' && failResult.failure === 'starting value'),
  ])
});

const expectChain = expectAll('chain() should allow powerful recursive promise-like result composition', [
  expectChainResult,
  expectChainThen,
  expectChainCatch,
  expectChainPassThrough,
]);

module.exports = {
  expectChain,
};

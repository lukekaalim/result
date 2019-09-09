// @flow strict
const { expect, assert, emojiReporter } = require('@lukekaalim/test');
const { expectResult } = require('./test/result.test');

const test = async () => {
  const assertion = await expectResult.test();
  console.log(emojiReporter(assertion));
};

if (require.main === module) {
  test();
}

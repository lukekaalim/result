/*
  Result is a data type that represents a single branch in execution,
  where one branch performs the expected operation, and another handles
  a case where something unexpected happened.
  This is slightly more useful to use because it forces the developer to
  handle the error cases before accessing the value.
*/

const succeed = (success) => ({
  type: 'success',
  success,
});
const fail = (failure) => ({
  type: 'failure',
  failure,
});

// Simple handler function: if the result is successful, goto the second argument, it fails, goto the third
const handleResult = (
  result,
  onSuccess,
  onFailure,
) => {
  if (result.type === 'success') {
    return onSuccess(result.success);
  } else {
    return onFailure(result.failure);
  }
};

const chain = (result) => ({
  then: (resolve) => result.type === 'success' ? chain(resolve(result.success)) : chain(result),
  catch: (reject) => result.type === 'failure' ? chain(reject(result.failure)) : chain(result),
  result: () => result,
});


const main = async (res/*: Result<string, Error>*/) => {
  const greeting = chainResult(res)
    .then(name => succeed(`Hello ${name}, how are you?`))
    .catch(error => succeed(`Oh fuck of shit ${error.message}`))
    .then(greeting => succeed({ type: 'greeting', greeting }))
}

module.exports = {
  succeed,
  fail,
  handleResult,
  chain,
};

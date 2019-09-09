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
const handle = (
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
  then: (resolve) => handle(result,
    success => chain(resolve(success)),
    () => chain(result)
  ),
  catch: (reject) => handle(result,
    () => chain(result),
    (failure) => chain(reject(failure))
  ),
  result: () => result,
});

module.exports = {
  succeed,
  fail,
  handle,
  chain,
};

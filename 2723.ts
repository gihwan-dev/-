type P = Promise<number>;

async function addTwoPromises(promise1: P, promise2: P) {
  const number1 = await promise1;
  const number2 = await promise2;
  return number1 + number2;
}

addTwoPromises(Promise.resolve(2), Promise.resolve(2)).then(console.log); // 4

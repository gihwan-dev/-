/*
비동기 함수의 목록인 functions와 pool limit 인 n이 주어지면 promisePool을 반환해라.
모든 입력 함수들이 resolve 된 이후에 promise를 반환해야 한다.

Pool limit은 한번에 pending될 수 있는 promises의 최대 숫자를 의미한다. promisePool은 가능한 최대한 많은 함수를 실행시켜야 한다.
promise pool은 functions[i], functions[i + 1], functions[i + 2] 와 같은 순으로 실행되어야 한다.
마지만 promise가 resolve되면 promisePool 또한 resolve 되어야 한다.


 */

/**
 * @param {Function[]} functions
 * @param {number} n
 * @return {Promise<any>}
 */
var promisePool = async function (functions, n) {
  const results = [];
  const inProgress = [];
  let i = 0;

  while (i < functions.length || inProgress.length > 0) {
    while (inProgress.length < n && i < functions.length) {
      const promise = functions[i]();
      const index = i;
      // promise.then은 프로미스가 성공적으로 완료되었을 때 실행될 콜백 함수를 등록한다. 콜백은 비동기적으로 실행된다.
      const resultPromise = promise.then((result) => {
        results[index] = result;
        inProgress.splice(inProgress.indexOf(resultPromise), 1);
      });
      inProgress.push(resultPromise);
      i++;
    }
    // Promise.race 는 여러 프로미스 중에서 가장 먼저 완료되는 프로미스의 결과나 오류를 반환한다. 주어진 프로미스중 하나라도 완료(또는 거부)되면 Promise.race의 결과
    // 역시도 그와 동일한 상태로 전환된다.
    await Promise.race(inProgress);
  }
  return results;
};

/**
 * const sleep = (t) => new Promise(res => setTimeout(res, t));
 * promisePool([() => sleep(500), () => sleep(400)], 1)
 *   .then(console.log) // After 900ms
 */

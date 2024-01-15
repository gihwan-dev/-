/**
 * 
 * @param {string} X 
 * @param {string} Y 
 * @returns 
 */

function solution(X, Y) {
  const map = {};

  const arrX = X.split('');
  const arrY = Y.split('');

  for (let i = 0; i < 10; i++) {
    map[i] = 0;
  }

  arrX.forEach(item => {
    map[item]++;
  })

  arrY.forEach(item => {
    map[item]++;
  })

  const resultArr = [];

  for (let i = 0; i < 10; i++) {
    if (map[i] > 1) {
      for (let j = 0; j < map[i] / 2; j++) {
        resultArr.push(i + "");
      }
    }
  }

  console.log(resultArr);

  var answer = '';
  return answer;
}

solution("100", "123450");
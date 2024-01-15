function solution(arr) {
  var answer = [];

  arr.forEach((item) => {
    if (answer.length === 0) {
      answer.push(item);
      return;
    }
    if (answer[answer.length - 1] !== item) {
      answer.push(item);
      return;
    }
  });

  return answer;
}

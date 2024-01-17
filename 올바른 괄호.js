function solution(s) {
  let count = 0;
  if (s[0] === ")") {
    return false;
  }
  if (s.length % 2 !== 0) {
    return false;
  }
  for (let i = 0; i < s.length; i++) {
    s[i] === "(" ? count++ : count--;
    if (count < 0) {
      return false;
    }
  }

  return count === 0 ? true : false;
}

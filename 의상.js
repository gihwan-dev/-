function solution(clothes) {
  const map = new Map();
  let answer = 1;
  clothes.forEach((item) => {
    value = map.get(item[1]);
    if (value !== undefined) {
      map.set(item[1], value + 1);
    } else {
      map.set(item[1], 1);
    }
  });
  map.forEach((item) => {
    answer *= item + 1;
  });
  return answer - 1;
}

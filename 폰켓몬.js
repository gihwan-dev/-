/**
 *
 * @param {number[]} nums
 * @returns
 */

function solution(nums) {
  const N = nums.length;
  const map = new Map();
  nums.forEach((item) => {
    const value = map.get(item);
    if (value !== undefined) {
      map.set(item, value + 1);
    } else {
      map.set(item, 1);
    }
  });
  if (N / 2 > map.size) {
    return map.size;
  } else {
    return N / 2;
  }
}
console.log();

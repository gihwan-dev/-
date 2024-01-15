/**
 *
 * @param {number} r1
 * @param {number} r2
 * @returns
 */

function solution(r1, r2) {
  let count = 0;
  for (let y = 0; y <= r2; y++) {
    for (let x = 0; x <= r2; x++) {
      if (y * y + x * x >= r2 * r2) {
        count++;
      }
    }
  }
  return count * 4 - 8;
}

solution(2, 3);

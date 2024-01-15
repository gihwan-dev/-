/**
 *
 * @param {number[]} participant
 * @param {number[]} completion
 * @returns
 */

function solution(participant, completion) {
  const map = new Map();

  participant.forEach((item) => {
    const value = map.get(item);
    if (value !== undefined) {
      map.set(item, value + 1);
    } else {
      map.set(item, 1);
    }
  });

  completion.forEach((item) => {
    const value = map.get(item);
    map.set(item, value - 1);
  });

  let result;
  participant.forEach((item) => {
    const value = map.get(item);
    if (value !== 0) {
      result = item;
    }
  });

  return result;
}

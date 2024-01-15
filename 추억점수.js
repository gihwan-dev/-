/**
 * 
 * @param {string[]} name 
 * @param {number[]} yearning 
 * @param {string[][]} photo 
 * @returns 
 */
function solution(name, yearning, photo) {
  const map = new Map();

  name.forEach((item, index) => {
    map.set(item, yearning[index]);
  });

  const result = photo.map(items => {
    let sum = 0;
    items.forEach(item => {
      const value = map.get(item);
      if (value !== undefined) {
        sum += map.get(item);
      }
    })
    return sum;
  })
  return result;
}

// solution(["may", "kein", "kain", "radi"], [5, 10, 1, 3], [["may", "kein", "kain", "radi"],["may", "kein", "brin", "deny"], ["kon", "kain", "may", "coni"]]);
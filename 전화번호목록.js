function solution(phone_book) {
  const sortedPhone = phone_book.sort((a, b) => a.length - b.length);
  let result = true;
  const map = new Map();
  map.set(sortedPhone[0], true);
  sortedPhone.shift();
  sortedPhone.forEach((item) => {
    for (let i = 0; i <= item.length; i++) {
      const value = item.slice(0, i);
      if (map.has(value)) {
        result = false;
      }
    }
    map.set(item, true);
  });
  return result;
}

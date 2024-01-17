// const values = [];

// for (let i = 0; i < 10000000; i++) {
//   values.push(i);
// }

// values.join("");

// // for 루프 사용
// console.time("for loop");
// for (let i = 0; i < values.length; i++) {}
// console.timeEnd("for loop");

// // for...of 루프 사용
// console.time("for...of loop");
// for (const char of values) {
// }
// console.timeEnd("for...of loop");

// // for...in 루프 사용
// console.time("for...in loop");
// for (const char in values) {
// }
// console.timeEnd("for...in loop");

// // forEach 사용 (문자열을 배열로 변환)
// console.time("forEach loop");
// values.forEach((char) => {});
// console.timeEnd("forEach loop");

const values = [1, 2, 3, 4, 5];

for (let value in values) {
  console.log(value);
}

/*
또는 백트래킹 활용
빈칸을 0으로 하고
이동 방향의 첫번 째 블록에서 부터 반대방향으로 차례대로 훑어본다.
같은 수가 있다면 합친다
0 또한 합친다.
합칠 때 합쳐졌다면 합쳐진 수는 0이 된다.
5번 이동시켜서 가장 큰 수 출력
N * N 크기의 보드
*/

// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().split("\n");

// TODO 합치고 위치 변경시키는 조건 손봐야함. 잘생각해보자 어떨 때 변경할 수 있고 합체할 수 있는지

const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().split("\n");

const N = +input[0];

const board = [];

const visited = {};

for (let i = 0; i < N; i++) {
  board.push([input[i + 1]].toString().split(" "));
}

let maxValue = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    board[i][j] = Number(board[i][j]);
    maxValue = Math.max(maxValue, board[i][j]);
  }
}

visited[board.flat().join("")] = true;

const queue = [[...board]];

let count = 0;

while (count < 5) {
  const newQueue = [];
  while (queue.length !== 0) {
    const target = queue.shift();
    const leftMovedBoard = leftRightMove(deepCopy(target), "left");
    const rightMovedBoard = leftRightMove(deepCopy(target), "right");
    const topMovedBoard = topBottomMove(deepCopy(target), "top");
    const bottomMovedBoard = topBottomMove(deepCopy(target), "bottom");
    if (!visited[leftMovedBoard.flat().join("")]) {
      newQueue.push(leftMovedBoard);
      visited[leftMovedBoard.flat().join("")] = true;
    }
    if (!visited[rightMovedBoard.flat().join("")]) {
      newQueue.push(rightMovedBoard);
      visited[rightMovedBoard.flat().join("")] = true;
    }
    if (!visited[topMovedBoard.flat().join("")]) {
      newQueue.push(topMovedBoard);
      visited[topMovedBoard.flat().join("")] = true;
    }
    if (!visited[bottomMovedBoard.flat().join("")]) {
      newQueue.push(bottomMovedBoard);
      visited[bottomMovedBoard.flat().join("")] = true;
    }
  }
  queue.push(...newQueue);
  count++;
}

console.log(maxValue);

function leftRightMove(targetBoard, moveDirection) {
  if (moveDirection === "left") {
    for (let x = 0; x < N; x++) {
      for (let y = 0; y < N; y++) {
        let passed = false;
        for (let start = x + 1; start < N; start++) {
          if (passed) {
            break;
          }
          if (
            targetBoard[y][x] === 0 ||
            targetBoard[y][start] === targetBoard[y][x]
          ) {
            const initialValue = targetBoard[y][x];
            targetBoard[y][x] += targetBoard[y][start];
            maxValue = Math.max(maxValue, targetBoard[y][x]);
            targetBoard[y][start] = 0;
            changed = true;
            if (initialValue !== 0) {
              break;
            }
          }
          if (targetBoard[y][x] !== 0 && targetBoard[y][start] !== 0) {
            passed = true;
          }
        }
      }
    }
  }
  if (moveDirection === "right") {
    for (let x = N - 1; x >= 0; x--) {
      for (let y = 0; y < N; y++) {
        let passed = false;
        for (let start = x - 1; start >= 0; start--) {
          if (passed) {
            break;
          }
          if (
            targetBoard[y][x] === 0 ||
            targetBoard[y][start] === targetBoard[y][x]
          ) {
            const initialValue = targetBoard[y][x];
            targetBoard[y][x] += targetBoard[y][start];
            maxValue = Math.max(maxValue, targetBoard[y][x]);
            targetBoard[y][start] = 0;
            if (initialValue !== 0) {
              break;
            }
          }
          if (targetBoard[y][x] !== 0 && targetBoard[y][start] !== 0) {
            passed = true;
          }
        }
      }
    }
  }
  return targetBoard;
}

function topBottomMove(targetBoard, moveDirection) {
  if (moveDirection === "top") {
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        let passed = false;
        for (let start = y + 1; start < N; start++) {
          if (passed) {
            break;
          }
          if (
            targetBoard[y][x] === 0 ||
            targetBoard[start][x] === targetBoard[y][x]
          ) {
            const initialValue = targetBoard[y][x];
            targetBoard[y][x] += targetBoard[start][x];
            maxValue = Math.max(maxValue, targetBoard[y][x]);
            targetBoard[start][x] = 0;
            if (initialValue !== 0) {
              break;
            }
          }
          if (targetBoard[y][x] !== 0 && targetBoard[start][x] !== 0) {
            passed = true;
          }
        }
      }
    }
  }
  if (moveDirection === "bottom") {
    for (let y = N - 1; y >= 0; y--) {
      for (let x = 0; x < N; x++) {
        let passed = false;
        for (let start = y - 1; start >= 0; start--) {
          if (passed) {
            break;
          }
          if (
            targetBoard[y][x] === 0 ||
            targetBoard[start][x] === targetBoard[y][x]
          ) {
            const initialValue = targetBoard[y][x];
            targetBoard[y][x] += targetBoard[start][x];
            maxValue = Math.max(maxValue, targetBoard[y][x]);
            targetBoard[start][x] = 0;
            if (initialValue !== 0) {
              break;
            }
          }
          if (targetBoard[y][x] !== 0 && targetBoard[start][x] !== 0) {
            passed = true;
          }
        }
      }
    }
  }
  return targetBoard;
}

function deepCopy(arr) {
  return JSON.parse(JSON.stringify(arr));
}

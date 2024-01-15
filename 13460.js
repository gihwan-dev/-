// 세로 N 가로 M
// 오, 왼, 위, 아래 기울이기
// 빨간 구슬 구멍 성공
// 파란 구슬 구멍 실패
// 동시 실패
// 기울이기는 구슬이 멈출 때 까지
// 최소 몇 번 만에 빨간 구슬을 빼낼 수 있는지
// . 빈칸, # 장애물, 0 구멍, R 빨간 구슬, B 파란 구슬
// 가장자리에는 모두 #이 있다.
// 10번 이하로 움직여서 빨간 구슬을 빼낼 수 없으면 -1을 출력한다.

// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().split("\n");

const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().split("\n");

let [N, M] = input[0].split(" ");
N = Number(N);
M = Number(M);

const maze = [];

const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

const rPos = { x: null, y: null };
const bPos = { x: null, y: null };
const queue = [];
const visited = {};

for (let i = 1; i <= N; i++) {
  const inputRow = input[i].split("");
  const targetRow = [];
  for (let j = 0; j < M; j++) {
    targetRow.push(inputRow[j]);
    if (inputRow[j] === "R") {
      rPos.x = j;
      rPos.y = i - 1;
    }
    if (inputRow[j] === "B") {
      bPos.x = j;
      bPos.y = i - 1;
    }
  }
  maze.push(targetRow);
}

visited[`${rPos.x}${rPos.y}${bPos.x}${bPos.y}`] = true;

queue.push({ rPos, bPos, count: 1 });

while (queue.length !== 0) {
  const target = queue.shift();
  for (let i = 0; i < 4; i++) {
    const redResult = move(dx[i], dy[i], target.rPos, maze);
    const blueResult = move(dx[i], dy[i], target.bPos, maze);
    if (redResult.x === blueResult.x && redResult.y === blueResult.y) {
      if (maze[redResult.y][redResult.x] !== "O") {
        redResult.count > blueResult.count
          ? alignRedAndBlue(redResult, dx[i], dy[i])
          : alignRedAndBlue(blueResult, dx[i], dy[i]);
      } else {
        continue;
      }
    }
    if (maze[blueResult.y][blueResult.x] === "O") {
      continue;
    }
    if (
      !visited[`${redResult.x}${redResult.y}${blueResult.x}${blueResult.y}`]
    ) {
      visited[
        `${redResult.x}${redResult.y}${blueResult.x}${blueResult.y}`
      ] = true;
      queue.push({
        rPos: redResult,
        bPos: blueResult,
        count: target.count + 1,
      });
    }
    if (maze[redResult.y][redResult.x] === "O") {
      console.log(target.count);
      return;
    }
  }
  if (target.count > 10) {
    console.log(-1);
    return;
  }
}

if (queue.length === 0) {
  console.log(-1);
  return;
}

function move(dx, dy, pos, enteredMaze) {
  const target = { ...pos };
  let value = enteredMaze[pos.y][pos.x];
  let count = 0;
  while (keepGoing(value)) {
    target.x += dx;
    target.y += dy;
    value = enteredMaze[target.y][target.x];
    count++;
  }
  if (value === "#") {
    return { x: target.x - dx, y: target.y - dy, count: count };
  } else {
    return { x: target.x, y: target.y, count };
  }
}

function keepGoing(value) {
  switch (value) {
    case "#":
      return false;
    case "O":
      return false;
    default:
      return true;
  }
}

function alignRedAndBlue(ball, dx, dy) {
  ball.x -= dx;
  ball.y -= dy;
}

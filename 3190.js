// NxN 정사각 보드
// 사과
// 벽있음
// 맨위 맨좌측에 위치하고 뱀의 길이는 1, 뱀은 처음에 오른쪽을 향함
// 뱀은 매 초마다 이동
// 몸길이를 늘려 머리를 다음칸에 위치시킨다.
// 벽이나 자기자신의 몸과 부딫이면 게임이 끝난다.
// 만약 이동한 칸에 사과가 있다면, 그 칸에 있던 사과가 없어지고 꼬리는 움직이지 않는다.
// 사과가 없다면, 몸길이를 줄여서 꼬리가 위차한 칸을 비워준다. 즉, 몸길이는 변하지 않는다.

// 몇 초에 끝나는지 계산하라.

// 첫 줄에 N
// K 사과의 개수
// 다음 K줄에는 사과의 위치 (행, 열) 1행 1열에는 사과 없다
// 뱀의 방향 변환 횟수 L
// 다음 L개의 줄에는 방향 전환 정보 정수 X, 문자 C X초가 끝난 뒤 C 방향으로 90도 회전 (L = 왼, D = 오)
// X가 증가하는 순으로 주어짐

// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().split("\n");

const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().split("\n");

const N = Number(input[0]);

const K = Number(input[1]);

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

let dIndex = 0;
const direction = {
  L: -1,
  D: 1,
};

const apples = [];

let count = 1;

for (let i = 2; i < K + 2; i++) {
  const value = input[i].split(" ");
  const target = {
    col: Number(value[0]),
    row: Number(value[1]),
  };
  apples.push(target);
}

const L = Number(input[2 + K]);

const moveInfo = [];

for (let i = K + 3; i < K + 3 + L; i++) {
  const target = input[i].split(" ");
  const second = Number(target[0]);
  const direction = target[1];
  moveInfo.push({ second, direction });
}

let map = [];
// 지도 만들기
// 1 = 벽, 0 = 땅, 2 = 사과
for (let i = 0; i <= N + 1; i++) {
  const row = [];
  for (let j = 0; j <= N + 1; j++) {
    if (i === 0 || i === N + 1 || j === 0 || j === N + 1) {
      row.push(1);
    } else row.push(0);
  }
  map.push(row);
}

map;
apples.forEach((apple) => {
  map[apple.col][apple.row] = 2;
});

map;
let snake = [{ row: 1, col: 1 }];

// 게임 오버 체크 함수
// - 뱀 머리가 벽에 부딫 혔는지
// - 뱀 머리가 꼬리에 닿았는지
function isOver() {
  const head = snake[0];
  if (map[head.row][head.col] === 1) {
    return true;
  }
  let flag = false;
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].col === head.col && snake[i].row === head.row) {
      flag = true;
    }
  }

  if (flag) {
    return true;
  }
  return false;
}

// 뱀 이동 함수
// - 사과를 먹었을 때
// - 사과를 먹지 않았을 때
function moveSnake() {
  //머리 움직인 이전 머리 위치
  const tempHeadPos = { ...snake[0] };
  // 머리 움직인 이후 머리 위치
  snake[0] = { row: snake[0].row + dy[dIndex], col: snake[0].col + dx[dIndex] };
  // 사과 먹음
  if (map[snake[0].row][snake[0].col] === 2) {
    map[snake[0].row][snake[0].col] = 0;
    const updatedSnake = [{ ...snake[0] }, { ...tempHeadPos }];
    const tempSnake = snake.slice(1);
    snake = [...updatedSnake, ...tempSnake];
    return true;
  }

  if (isOver()) {
    return false;
  }

  let next = { ...tempHeadPos };
  snake = snake.map((item, index) => {
    if (index === 0) {
      return item;
    }
    const result = { ...next };
    next = item;
    return result;
  });
  return true;
}

// 시간 경과
while (true) {
  if (moveInfo.length !== 0 && moveInfo[0].second + 1 === count) {
    dIndex = dIndex + direction[moveInfo[0].direction];
    if (dIndex > 3) {
      dIndex = 0;
    } else if (dIndex < 0) {
      dIndex = 3;
    }
    moveInfo.shift();
  }
  const result = moveSnake();
  if (result === false) {
    break;
  }
  count++;
}

console.log(count);

// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().split("\n");

const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().split("\n");

const firstLineInput = input[0].split(" ");

const dx = [1, 0, -1, 0];
const dy = [0, -1, 0, 1];

const directionIndex = {
  east: 3,
  west: 1,
  north: 2,
  south: 0,
};

const directionString = {
  1: "east",
  2: "west",
  3: "north",
  4: "south",
};

const N = +firstLineInput[0];
const M = +firstLineInput[1];
const K = +firstLineInput[4];

let command = [];

let map = [];

let dicePosition = {
  x: +firstLineInput[2],
  y: +firstLineInput[3],
};

for (let i = 1; i <= N; i++) {
  const arr = input[i].split(" ");
  const temp = [];
  for (let j = 0; j < M; j++) {
    temp.push(+arr[j]);
  }
  map.push(temp);
}

map;
const commandString = input[N + 1].split(" ");
for (let i = 0; i < K; i++) {
  command.push(+commandString[i]);
}

let dice = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  front: 0,
  back: 0,
};

const diceCanMove = (moveDirection) => {
  const targetDicePosition = { ...dicePosition };
  const index = directionIndex[moveDirection];
  const x = targetDicePosition.x + dx[index];
  const y = targetDicePosition.y + dy[index];

  if (x < 0 || x > N - 1) {
    return false;
  }

  if (y < 0 || y > M - 1) {
    return false;
  }
  return true;
};

const moveDice = (moveDirection) => {
  const index = directionIndex[moveDirection];

  dicePosition.x = dicePosition.x + dx[index];
  dicePosition.y = dicePosition.y + dy[index];
};

const changeDiceValue = (moveDirection) => {
  const tempDice = { ...dice };
  switch (moveDirection) {
    case "east":
      dice.right = tempDice.bottom;
      dice.bottom = tempDice.left;
      dice.left = tempDice.top;
      dice.top = tempDice.right;
      return;
    case "west":
      dice.left = tempDice.bottom;
      dice.bottom = tempDice.right;
      dice.right = tempDice.top;
      dice.top = tempDice.left;
      return;
    case "north":
      dice.back = tempDice.bottom;
      dice.bottom = tempDice.front;
      dice.front = tempDice.top;
      dice.top = tempDice.back;
      return;
    case "south":
      dice.front = tempDice.bottom;
      dice.bottom = tempDice.back;
      dice.back = tempDice.top;
      dice.top = tempDice.front;
      return;
  }
};

const changeMapDiceValue = () => {
  const targetMapValue = map[dicePosition.x][dicePosition.y];

  if (targetMapValue === 0) {
    map[dicePosition.x][dicePosition.y] = dice.bottom;
  } else {
    dice.bottom = targetMapValue;
    map[dicePosition.x][dicePosition.y] = 0;
  }
};

command.map((item) => {
  const moveDirection = directionString[item];
  if (diceCanMove(moveDirection)) {
    moveDice(moveDirection);
    changeDiceValue(moveDirection);
    changeMapDiceValue();
    console.log(dice.top);
  }
});

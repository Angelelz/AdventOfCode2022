const input = require("./input").split("\n");

const initialPos = [0, 0];

const visited = new Set();

visited.add(initialPos.toString());

const headPos = initialPos.slice(),
  tailPos = initialPos.slice();

const commandMap = {
  R: (pos) => (pos[0] += 1),
  D: (pos) => (pos[1] -= 1),
  L: (pos) => (pos[0] -= 1),
  U: (pos) => (pos[1] += 1),
};

const newHeadPos = (command, headPos) => {
  const commandArr = command.split(" ");
  const direction = commandArr[0];
  const quantity = +commandArr[1];

  commandMap[direction](headPos);
  const newQuantity = quantity - 1;
  return `${direction} ${newQuantity}`;
};

const newTailPos = (headPos, tailPos) => {
  const xDiff = headPos[0] - tailPos[0];
  const yDiff = headPos[1] - tailPos[1];
  const xAbs = Math.abs(xDiff);
  const yAbs = Math.abs(yDiff);
  if ((xAbs > 1 && yAbs === 1) || (yAbs > 1 && xAbs === 1)) {
    tailPos[0] += xDiff / xAbs;
    tailPos[1] += yDiff / yAbs;
    return;
  }
  if (xAbs > 1) {
    tailPos[0] += xDiff / xAbs;
  }
  if (yAbs > 1) {
    tailPos[1] += yDiff / yAbs;
  }
};

const processCommand = (command) => {
  let currentCommand = command;
  const quantity = +currentCommand.split(" ")[1];
  for (let i = 0; i < quantity; i += 1) {
    currentCommand = newHeadPos(currentCommand, headPos);
    newTailPos(headPos, tailPos);
    visited.add(tailPos.toString());
  }
};

input.forEach((line) => processCommand(line));

const answer1 = visited.size;

module.exports.one = `Answer 9.1 is ${answer1}`;

const newVisited = new Set();
newVisited.add(initialPos.toString())

let positions = [];

const TAILSANDHEADNUMBER = 10;

let n = TAILSANDHEADNUMBER;

while (n > 0) {
  positions.push([0, 0]);
  --n;
}

const newProcessCommand = (command) => {
  let currentCommand = command;
  const quantity = +currentCommand.split(" ")[1];
  for (let i = 0; i < quantity; i += 1) {
    currentCommand = newHeadPos(currentCommand, positions[0]);
    for (let j = 0; j < TAILSANDHEADNUMBER - 1; j += 1) {
      newTailPos(positions[j], positions[j + 1]);
    }
    newVisited.add(positions[TAILSANDHEADNUMBER - 1].toString());
  }
};

input.forEach(line => newProcessCommand(line))

const answer2 = newVisited.size;

module.exports.two = `Answer 9.2 is ${answer2}`;

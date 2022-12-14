const input = require("./input").split("\n");

const start = {};
const end = {};

input.forEach((line, index) => {
  const length = line.length;
  for (let i = 0; i < length; i += 1) {
    if (line[i] === "S") {
      start.y = index;
      start.x = i;
      input[index] = input[index].replace("S", "a")
    }
    if (line[i] === "E") {
      end.y = index;
      end.x = i;
      input[index] = input[index].replace("E", "{")
    }
  }
});

const posToString = (posi) => `${posi.y},${posi.x}`;
const stringToPos = (str) => ({ y: +str.split(",")[0], x: +str.split(",")[1] });

const getLetter = (point) => {
  const pos = stringToPos(point)
  return input[pos.y][pos.x]
}

const isAllowed = (from, to) => {
  if (to.includes("-")) return false
  const posTo = stringToPos(to)
  if (posTo.y >= input.length || posTo.x >= input[0].length) return false
  const letterFrom = getLetter(from)
  const letterTo = getLetter(to)
  // if (letterTo === "S") return false
  // if (letterFrom === "S" && letterTo !== "a") return false
  // if (letterTo === "E" && letterFrom !== "z") return false
  const charCodeFrom = letterFrom.charCodeAt(0)
  const charCodeTo = letterTo.charCodeAt(0)
  if (charCodeTo > charCodeFrom + 1) return false
  return true
}

const distance = {};
const previous = {};
const unvisited = new Set();

input.forEach((line, y) => {
  for (let x = 0; x < line.length; x++) {
    const str = posToString({ y, x });
    unvisited.add(str);
    distance[str] = Infinity;
  }
});

distance[posToString(start)] = 0;

while (unvisited.size) {
  const u = Array.from(unvisited).sort((a, b) => distance[a] - distance[b])[0];
  unvisited.delete(u)
  const currentPos = stringToPos(u);
  const neighbor = [
    posToString({ y: currentPos.y + 1, x: currentPos.x }),
    posToString({ y: currentPos.y, x: currentPos.x + 1 }),
    posToString({ y: currentPos.y - 1, x: currentPos.x }),
    posToString({ y: currentPos.y, x: currentPos.x - 1 })
  ];
  const allowed = neighbor.filter(pos => {
    return unvisited.has(pos) && isAllowed(u, pos)
  })
  allowed.forEach(v => {
    const alt = distance[u] + 1
    if (alt < distance[v]) {
      distance[v] = alt;
      previous[v] = u
    }
  })
}

const fs = require('fs')
fs.rmSync("./data.txt")

input.forEach((line, y) => {
  for (let x = 0; x < line.length; x++) {
    if (distance[`${y},${x}`] === Infinity) fs.appendFileSync("./data.txt", "INF-" + input[y][x] + " ")
    else fs.appendFileSync("./data.txt", distance[`${y},${x}`].toString().padStart(3, "0") + "-" + input[y][x] + " ")
  }
  fs.appendFileSync("./data.txt", "\n")
});
let path = ""

let pr = previous[posToString(end)]
while (pr) {
  const prevPos = stringToPos(pr)
  path = input[prevPos.y][prevPos.x] + path
  pr = previous[pr]
}

console.log(distance[posToString(end)], path);

const answer1 = 1;

module.exports.one = `Answer 12.1 is ${answer1}`;

const answer2 = 2;

module.exports.two = `Answer 12.2 is ${answer2}`;

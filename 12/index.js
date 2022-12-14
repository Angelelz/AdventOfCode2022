const input = require("./input").split("\n");

const start = {};
const end = {};

input.forEach((line, index) => {
  const length = line.length;
  for (let i = 0; i < length; i += 1) {
    if (line[i] === "S") {
      start.y = index;
      start.x = i;
      input[index] = input[index].replace("S", "a");
    }
    if (line[i] === "E") {
      end.y = index;
      end.x = i;
      input[index] = input[index].replace("E", "{");
    }
  }
});

const posToString = (posi) => `${posi.y},${posi.x}`;
const stringToPos = (str) => ({ y: +str.split(",")[0], x: +str.split(",")[1] });

const getLetter = (point) => {
  const pos = stringToPos(point);
  return input[pos.y][pos.x];
};

const isAllowed = (from, to) => {
  if (to.includes("-")) return false;
  const posTo = stringToPos(to);
  if (posTo.y >= input.length || posTo.x >= input[0].length) return false;
  const letterFrom = getLetter(from);
  const letterTo = getLetter(to);
  const charCodeFrom = letterFrom.charCodeAt(0);
  const charCodeTo = letterTo.charCodeAt(0);
  if (charCodeTo > charCodeFrom + 1) return false;
  return true;
};

const getShortestDistance = (input, start, end, isAllowed, earlyExit) => {
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
    const u = Array.from(unvisited).sort(
      (a, b) => distance[a] - distance[b]
    )[0];
    unvisited.delete(u);
    const currentPos = stringToPos(u);
    const neighbor = [
      posToString({ y: currentPos.y + 1, x: currentPos.x }),
      posToString({ y: currentPos.y, x: currentPos.x + 1 }),
      posToString({ y: currentPos.y - 1, x: currentPos.x }),
      posToString({ y: currentPos.y, x: currentPos.x - 1 }),
    ];
    const allowed = neighbor.filter((pos) => {
      return unvisited.has(pos) && isAllowed(u, pos);
    });
    for (let i = 0; i < allowed.length; i += 1) {
      const v = allowed[i];
      const alt = distance[u] + 1;
      if (alt < distance[v]) {
        distance[v] = alt;
        previous[v] = u;
        if (v === posToString(end) || earlyExit?.(v))
          return {
            distance,
            previous,
            win: alt,
          };
      }
    }
  }
  return {
    distance,
    previous,
  };
};

const { distance, previous } = getShortestDistance(
  input,
  start,
  end,
  isAllowed
);

let path = [posToString(end)];

let pr = previous[posToString(end)];
while (pr) {
  path.unshift(pr);
  pr = previous[pr];
}

const printRouteToFile = (fileName) => {
  const fs = require("fs");
  if (fs.existsSync(fileName)) fs.rmSync(fileName);

  input.forEach((line, y) => {
    for (let x = 0; x < line.length; x++) {
      if (path.includes(posToString({ y, x })))
        fs.appendFileSync(fileName, ".");
      else fs.appendFileSync(fileName, input[y][x]);
    }
    fs.appendFileSync(fileName, "\n");
  });
};

printRouteToFile("./data.txt");

const answer1 = distance[posToString(end)] - 2;

module.exports.one = `Answer 12.1 is ${answer1}`;

const isAllowed2 = (from, to) => {
  if (to.includes("-")) return false;
  const posTo = stringToPos(to);
  if (posTo.y >= input.length || posTo.x >= input[0].length) return false;
  const letterFrom = getLetter(from);
  const letterTo = getLetter(to);

  const charCodeFrom = letterFrom.charCodeAt(0);
  const charCodeTo = letterTo.charCodeAt(0);
  if (charCodeTo + 1 === charCodeFrom || charCodeTo >= charCodeFrom) {
    return true;
  }
  return false;
};

const earlyExit = (str) => {
  const le = input[stringToPos(str).y][stringToPos(str).x];
  if (le === "a") {
    return true;
  }
  return false;
};

const { win } = getShortestDistance(input, end, start, isAllowed2, earlyExit);

const answer2 = win - 2;

module.exports.two = `Answer 12.2 is ${answer2}`;

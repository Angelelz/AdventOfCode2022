const input = require("./input").split("\n");

const paths = input.map((line) =>
  line
    .split(" -> ")
    .map((points) => ({ x: +points.split(",")[0], y: +points.split(",")[1] }))
);

const maxX = paths.reduce(
  (total, path) =>
    Math.max(
      total,
      path.reduce((prev, point) => {
        return Math.max(prev, point.x);
      }, 0)
    ),
  0
);
const maxY = paths.reduce(
  (total, path) =>
    Math.max(
      total,
      path.reduce((prev, point) => {
        return Math.max(prev, point.y);
      }, 0)
    ),
  0
);
const minX = paths.reduce(
  (total, path) =>
    Math.min(
      total,
      path.reduce((prev, point) => {
        return Math.min(prev, point.x);
      }, Infinity)
    ),
  Infinity
);
const minY = paths.reduce(
  (total, path) =>
    Math.min(
      total,
      path.reduce((prev, point) => {
        return Math.min(prev, point.y);
      }, Infinity)
    ),
  Infinity
);

const pointToString = (point) => `${point.x},${point.y}`
const stringToPoint = (str) => ({
  x: +str.split(",")[0],
  y: +str.split(",")[1]
})

const lineToPointList = (currentList, currentSet, point1, point2) => {
  if (point1.x === point2.x) {
    for (let i = Math.min(point1.y, point2.y); i <= Math.max(point1.y, point2.y); i +=1) {
      const newPoint = {x: point1.x, y: i}
      const newPointStr = pointToString(newPoint)
      if (!currentSet.has(newPointStr)) {
        currentSet.add(newPointStr)
        currentList.push(newPoint)
      }
    }
  }
  if (point1.y === point2.y) {
    for (let i = Math.min(point1.x, point2.x); i <= Math.max(point1.x, point2.x); i +=1) {
      const newPoint = {x: i, y: point1.y}
      const newPointStr = pointToString(newPoint)
      if (!currentSet.has(newPointStr)) {
        currentSet.add(newPointStr)
        currentList.push(newPoint)
      }
    }
  }
}

const rockList = []
const rockSet = new Set()

paths.forEach(path => {
  for (let i = 0; i < path.length - 1; i+=1) {
    lineToPointList(rockList, rockSet, path[i], path[i+1])
  }
})

const startPoint = {x: 500, y: 0}
const startPointStr = pointToString(startPoint)

const totalSet = new Set(rockSet)
const sandSet = new Set()

const step = (pos, set) => {
  const down = {x: pos.x, y: pos.y + 1}
  const downLeft = {x: pos.x - 1, y: pos.y + 1}
  const downRight = {x: pos.x + 1, y: pos.y + 1}
  if (!set.has(pointToString(down))) return down
  if (!set.has(pointToString(downLeft))) return downLeft
  if (!set.has(pointToString(downRight))) return downRight
  return pos
}

const dropSand = (sandSet, totalSet, initialPos) => {
  let previousPos = initialPos
  let currentPos = step(previousPos, totalSet)
  
  while (pointToString(previousPos) !== pointToString(currentPos) && currentPos.y <= maxY + 3) {
    previousPos = {x: currentPos.x, y: currentPos.y}
    currentPos = step(previousPos, totalSet)
  }
  if (pointToString(previousPos) === pointToString(currentPos)) {
    // console.log("new pointSand: ", currentPos)
    totalSet.add(pointToString(currentPos))
    sandSet.add(pointToString(currentPos))
    if (pointToString(currentPos) === startPointStr) return null
    return pointToString(currentPos)
  }
  if(currentPos.y > maxY + 3) {
    return null
  }

}

let rockNum = 0

while (dropSand(sandSet, totalSet, startPoint)) {
  rockNum += 1;
}

const answer1 = rockNum;

module.exports.one = `Answer 14.1 is ${answer1}`;

const newRockList = []
const newRockSet = new Set()

const newPaths = [...paths, [{x: minX - 200, y: maxY + 2}, {x: minX + 200, y: maxY + 2}]]

newPaths.forEach(path => {
  for (let i = 0; i < path.length - 1; i+=1) {
    lineToPointList(newRockList, newRockSet, path[i], path[i+1])
  }
})


const newTotalSet = new Set(newRockSet)
const newSandSet = new Set()

let newRockNum = 0

while (dropSand(newSandSet, newTotalSet, startPoint)) {
  newRockNum += 1;
}

const answer2 = newRockNum + 1;

module.exports.two = `Answer 14.2 is ${answer2}`;

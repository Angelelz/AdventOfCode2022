const input = require("./input").split("\n");

const sensors = [];
const beacons = [];

input.forEach((line) => {
  const section = line.slice(line.indexOf("x="));
  const split = section.split(":");
  let x, y;
  eval(`${split[0]}`);
  sensors.push({ x, y });
  const section2 = split[1].slice(split[1].indexOf("x="));
  eval(section2);
  beacons.push({ x, y });
});

const calculateLength = (point1, point2) =>
  Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);

const distances = [];

sensors.forEach((sensor, index) => {
  distances.push(calculateLength(sensor, beacons[index]));
});

const minX =
  sensors.reduce((prev, sensor, index) => {
    return Math.min(prev, sensor.x, beacons[index].x);
  }, Infinity) - Math.max(...distances);
const minY =
  sensors.reduce((prev, sensor, index) => {
    return Math.min(prev, sensor.y, beacons[index].y);
  }, Infinity) - Math.max(...distances);
const maxX =
  sensors.reduce((prev, sensor, index) => {
    return Math.max(prev, sensor.x, beacons[index].x);
  }, 0) + Math.max(...distances);
const maxY =
  sensors.reduce((prev, sensor, index) => {
    return Math.max(prev, sensor.y, beacons[index].y);
  }, 0) + Math.max(...distances);

const pointToString = (point) => `${point.x},${point.y}`;
const stringToPoint = (str) => ({
  x: +str.split(",")[0],
  y: +str.split(",")[1],
});

const beaconsSet = new Set(beacons.map((beacon) => pointToString(beacon)));

const POSITION_Y = input.length === 14 ? 10 : 2000000;
let count = 0;

// for (let x = minX; x <= maxX; x += 1) {
//   let close = 0;
//   let index = 0;
//   while (close === 0 && index < sensors.length) {
//     const currentPos = { y: POSITION_Y, x };
//     if (
//       calculateLength(sensors[index], currentPos) <= distances[index] &&
//       !beaconsSet.has(pointToString(currentPos))
//     ) {
//       close += 1;
//     }
//     index += 1;
//   }

//   if (close > 0) count += 1;
// }

console.log(count);

const answer1 = count;

module.exports.one = `Answer 15.1 is ${answer1}`;

const maximum = input.length === 14 ? 20 : 4000000
const minimum = 0

// let distressLocation = null

// for (let x = minimum; x <= maximum; x +=1) {
//   for (let y = minimum; y <= maximum; y +=1) {
//     const isBlank = sensors.every((sensor, index) => {
//       return calculateLength(sensor, { y, x }) > distances[index]
//     })
//     if (isBlank) {
//       distressLocation = {y,x}
//       break
//     }
//   }
//   if (distressLocation !== null) break
//   console.log(x)
// }

const possibleLocations = new Set()

for (let x = minimum; x <= maximum; x +=1) {
  for (let y = minimum; y <= maximum; y +=1) {
    try {
      possibleLocations.add(`${x},${y}`)
    } catch (error) {
      console.log(possibleLocations.size)      
    }
  }
}
console.log("done")
// const answer2 = distressLocation.x * 4000000 + distressLocation.y;

console.log(answer2)

module.exports.two = `Answer 15.2 is ${answer2}`;

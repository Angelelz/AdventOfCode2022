const input = require("./input").split("\n");

const sensors = []
const beacons = []

input.forEach((line) => {
  const section = line.slice(line.indexOf("x="))
  const split = section.split(":")
  let x, y
  eval(`${split[0]}`)
  sensors.push({x, y})
  const section2 = split[1].slice(split[1].indexOf("x="))
  eval(section2)
  beacons.push({x, y})
})

const calculateLength = (point1, point2) => Math.abs(point1.x-point2.x) + Math.abs(point1.y-point2.y)

const distances = []

sensors.forEach((sensor, index) => {
  distances.push(calculateLength(sensor, beacons[index]))
})

const minX = sensors.reduce((prev, sensor, index) => {
  return Math.min(prev, sensor.x, beacons[index].x)
}, Infinity) - Math.max(...distances)
const minY = sensors.reduce((prev, sensor, index) => {
  return Math.min(prev, sensor.y, beacons[index].y)
}, Infinity) - Math.max(...distances)
const maxX = sensors.reduce((prev, sensor, index) => {
  return Math.max(prev, sensor.x, beacons[index].x)
}, 0) + Math.max(...distances)
const maxY = sensors.reduce((prev, sensor, index) => {
  return Math.max(prev, sensor.y, beacons[index].y)
}, 0) + Math.max(...distances)

const pointToString = (point) => `${point.x},${point.y}`
const stringToPoint = (str) => ({
  x: +str.split(",")[0],
  y: +str.split(",")[1]
})

const noBeaconSet = new Set()
console.log(sensors.length)
console.log({minX, minY, maxX, maxY})

sensors.forEach((sensor, index) => {
  const sensorMinX = sensor.x - distances[index]
  const sensorMinY = sensor.y - distances[index]
  const sensorMaxX = sensor.x + distances[index]
  const sensorMaxY = sensor.y + distances[index]
  for (let x = sensorMinX; x < sensorMaxX; x +=1) {
    for (let y = sensorMinY; y < sensorMaxY; y +=1) {
      const newPoint = pointToString({x, y})
      if (calculateLength({x, y}, sensor) <= distances[index] && !noBeaconSet.has(newPoint)) {
        noBeaconSet.add(newPoint)
      }
    }
  }
})
console.log("Done")

const noBeaconArr = Array.from(noBeaconSet).map(str => stringToPoint(str))
const beaconsSet = new Set(beacons.map(beacon => pointToString(beacon)))

const POSITION_Y = 2000000
let count = 0
noBeaconArr.forEach(point => {
  if (point.y === POSITION_Y && !beaconsSet.has(pointToString({x: point.x, y: point.y}))) {
    count += 1
  }
})


console.log(count)

const answer1 = 1;

module.exports.one = `Answer 15.1 is ${answer1}`;

const answer2 = 2;

module.exports.two = `Answer 15.2 is ${answer2}`;

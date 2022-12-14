const input = require("./input").split("\n\n");

const fullArray = input.map(str2Arr => {
  return str2Arr.split("\n").map(line => eval(line))
})

const compare = (left, right, index) => {
  if (typeof left[index] === "number" && typeof right[index] === "number") {
    if (left[index] < right[index]) return true
    if (left[index] > right[index]) return false
    // TODO: case when they are equal
  }
  if (typeof left[index] === "number" && Array.isArray(right[index])) {
    left[index] === [left[index]]
    return compare(left, right, index)
  }
  if (typeof right[index] === "number" && Array.isArray(left[index])) {
    right[index] === [right[index]]
    return compare(left, right, index)
  }
  if (Array.isArray(left[index]) && Array.isArray(right[index])) return compare(left[index], right[index])
  if (typeof left[index] === "undefined" && typeof right[index] === "undefined") {
    // TODO: case when they are both undefined (end of the array?)
  }
  if (typeof left[index] === "undefined") return true
  if (typeof right[index] === "undefined") return false
}

const pairInOrder = []

fullArray.forEach((pair, index) => {
  
})

console.log(fullArray[0][0])

const answer1 = 1;

module.exports.one = `Answer 12.1 is ${answer1}`;

const answer2 = 2;

module.exports.two = `Answer 12.2 is ${answer2}`;

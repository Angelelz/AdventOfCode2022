const input = require("./input")
let sum = 0;
const arr = input.split("\n").reduce((acc, curr) => {
  if (curr === '') {
    const newAcc = [...acc, sum]
    sum = 0
    return newAcc
  }
  sum += Number.parseInt(curr)
  return acc
}, []).sort((a, b) => b-a)

const answer1 = arr[0]

module.exports.one = `Answer 1.1 is ${arr[0]}`;

const answer2 = arr[0] + arr[1] + arr[2]

module.exports.two = `Answer 1.2 is ${answer2}`;
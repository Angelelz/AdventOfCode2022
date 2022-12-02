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

module.exports = `Answer 1.1 is ${arr[0]}`;
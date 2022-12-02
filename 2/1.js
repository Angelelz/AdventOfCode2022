const input = require("./input")
const arr = input.split("\n")
const newArr = arr.map(line => {
  return {
    him: line[0],
    me: line[2]
  }
})

let score = 0;
const shape = {
  "A": 0,
  "B": 1,
  "C": 2,
  "X": 0,
  "Y": 1,
  "Z": 2
}

newArr.forEach(obj => {
  let outcome = 0;
  if (shape[obj.me] === shape[obj.him]) outcome = 3
  if ((shape[obj.me] + 1) % 3 === shape[obj.him]) outcome = 0
  if ((shape[obj.him] + 1) % 3 === shape[obj.me]) outcome = 6
  // console.log(obj, outcome, shape[obj.me])
  score += shape[obj.me] + 1 + outcome
})

module.exports.one = `The answer 2.1 is ${score}`

let newScore = 0;
const newShape = {
  "A": 0,
  "B": 1,
  "C": 2,
  "X": 0,
  "Y": 3,
  "Z": 6
}

newArr.forEach(obj => {
  let me = 0;
  if (newShape[obj.me] === 3) me = newShape[obj.him] + 1
  if (newShape[obj.me] === 0) me = ((newShape[obj.him] + 2) % 3) + 1
  if (newShape[obj.me] === 6) me = ((newShape[obj.him] + 1) % 3) + 1
  // console.log(obj, outcome, newShape[obj.me])
  newScore += newShape[obj.me] + me
})

module.exports.two = `The answer 2.2 is ${newScore}`
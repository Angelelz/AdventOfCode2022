const input = require('./input')

const isThereARepeatedChar = (str) => {
  for (let i = 0; i < str.length - 1; i++) {
    if (str.slice(i + 1).includes(str[i])) return true
  }
  return false
}

const firstNonRepeatedIndex = (str, size) => {
  for (let i = 0; i < input.length - size; i++) {
    if (!isThereARepeatedChar(str.slice(i, i + size))) return i + size
  }
  return 0
}

const answer1 = firstNonRepeatedIndex(input, 4)

module.exports.one = `Answer 6.1 is ${answer1}`

const answer2 = firstNonRepeatedIndex(input, 14)

module.exports.two = `Answer 6.2 is ${answer2}`
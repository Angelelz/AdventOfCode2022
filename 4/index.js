const input = require('./input').split("\n")

const pairsArray = input.map(line => {
  const firstSplit =  line.split(",")
  const secondSplit = firstSplit.map(arr => {
    return arr.split("-").map(item => +item)
  })
  return secondSplit
})

const isContained = (a, b) => {
  if ((a[0] >= b[0] && a[1] <= b[1]) || (b[0] >= a[0] && b[1] <= a[1])) return true;
  return false
}

const numberOfContained = pairsArray.map(line => isContained(line[0], line[1]))

const answer1 = numberOfContained.reduce((acc, curr) => {
  if (curr) return ++acc
  return acc
}, 0)

module.exports.one = `Answer 4.1 is ${answer1}`

const overlaps = (a, b) => {
  if ((a[0] >= b[0] && a[0] <= b[1]) || (b[0] >= a[0] && b[0] <= a[1])) return true;
  return false
}

const numberOfOverlaps = pairsArray.map(line => overlaps(line[0], line[1]))

const answer2 = numberOfOverlaps.reduce((acc, curr) => {
  if (curr) return ++acc
  return acc
}, 0)

module.exports.two = `Answer 4.2 is ${answer2}`
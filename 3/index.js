const input = require('./input').split("\n")

const halves = input.map(line => ([
  line.slice(0, (line.length / 2)),
  line.slice((line.length / 2))
]))

const priority = (char) => {
  if (char.charCodeAt(0) > 96) {
    return char.charCodeAt(0) - 96
  }
  return char.charCodeAt(0) - 38
}
// lowercase 96
// uppercase 38

const repeated = (a, b) => {
  for (let i = 0; i < a.length; i++) {
    if (b.includes(a[i])) return priority(a[i])
  }
}

const priorities = halves.map(arr => (
  repeated(arr[0], arr[1])
))

const answer1 = priorities.reduce((acc, curr) => acc + curr, 0)

module.exports.one = `Answer 3.1 is ${answer1}`

const repeated3 = (a, b, c) => {
  for (let i = 0; i < a.length; i++) {
    if (b.includes(a[i]) && c.includes(a[i])) return priority(a[i])
  }
}

const group = input.reduce((acc, line, index, array) => {
  if (index % 3 === 0) return [...acc, [line, array[index + 1], array[index + 2]]]
  return acc
}, [])

const groupPriorities = group.map(arr => repeated3(arr[0], arr[1], arr[2]))

const answer2 = groupPriorities.reduce((a, b) => a+b)

module.exports.two = `Answer 3.2 is ${answer2}`
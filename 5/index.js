const input = require('./input').split("\n")
if (input[input.length - 1] === "") input.pop()
const division = input.findIndex((line, index) => line === "" && index > 1)

const stack = input.slice(input[0] === "" ? 1 : 0, division - 1)
const instructions = input.slice(division + 1)

// console.log({stack, instructions})

const parseStack = (stack, size) => {
  const stackArray = []
  for (let i = 0; i < stack.length; i++) {
    let curr = 0;
    for(let j = 0; j < stack[i].length; j++) {
      if (j % size === 1) {
        if (i === 0) stackArray[curr] = []
          if (stack[i][j] !== " ")stackArray[curr].push(stack[i][j])
        ++curr
      }
    }
  }
  stackArray.forEach(a => a.reverse())
  return stackArray
}

const parseInstructions = (instructions) => {
  return instructions.map(line => {
    return [+line.split(" ")[1], +line.split(" ")[3], +line.split(" ")[5]]
  })
}

const performInstructions = (parsedInstructions, inStack) => {
  const newStack = inStack.map(a => ([...a]))
  parsedInstructions.forEach(instruction => {
    for(let i = 0; i < instruction[0]; i++) {
      newStack[instruction[2] - 1].push(newStack[instruction[1] - 1].pop())
    }
  })
  return newStack
}

const parsedInstructions = parseInstructions(instructions)

const parsedStack = parseStack(stack, 4)

const stackCompleted = performInstructions(parsedInstructions, parsedStack)

const answer1 = stackCompleted.reduce((acc, curr) => acc + curr[curr.length - 1], "")

module.exports.one = `Answer 5.1 is ${answer1}`

const performNewInstructions = (parsedInstructions, inStack) => {
  const newStack = inStack.map(a => ([...a]))
  parsedInstructions.forEach(instruction => {
    const deleted = newStack[instruction[1] -1].splice(newStack[instruction[1] -1].length - instruction[0])
    newStack[instruction[2] -1] = [...newStack[instruction[2] -1], ...deleted]
  })
  return newStack
}

const newStackCompleted = performNewInstructions(parsedInstructions, parsedStack)

const answer2 = newStackCompleted.reduce((acc, curr) => acc + curr[curr.length - 1], "")

module.exports.two = `Answer 5.2 is ${answer2}`
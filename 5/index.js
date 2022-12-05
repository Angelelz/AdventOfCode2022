const input = require('./input').split("\n")

const stack = input.slice(1, 9)
const instructions = input.slice(11)

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

const performSteps = (parsedInstructions, parsedStack) => {
  parsedInstructions.forEach(instruction => {
    for(let i = 0; i < instruction[0]; i++) {
      console.log(instruction)
      console.log(parsedStack[instruction[2]], parsedStack[instruction[1]])
      parsedStack[instruction[2]].push(parsedStack[instruction[1]].pop())
    }
  })
}

const parsedInstructions = parseInstructions(instructions)

const parsedStack = parseStack(stack, 4)

performSteps(parsedInstructions, parsedStack)


console.log(parseStack(stack, 4), parsedStack)

const answer1 = 1

module.exports.one = `Answer 5.1 is ${answer1}`


const answer2 = 2

module.exports.two = `Answer 5.2 is ${answer2}`
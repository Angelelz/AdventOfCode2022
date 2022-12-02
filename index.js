const fs = require('fs')
const answers = []

answers.push(require("./1/1"))
answers.push(require("./1/2"))
answers.push(require("./2/1").one)
answers.push(require("./2/1").two)


const stringAnswers = answers.join("\n\n")
console.log(stringAnswers)
fs.writeFileSync("./readme.md", stringAnswers)
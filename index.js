const fs = require('fs')
const answers = []

answers.push(require("./1/1"))
answers.push(require("./1/2"))


const stringAnswers = answers.join("\n\n")
console.log(stringAnswers)
fs.writeFileSync("./readme.md", stringAnswers)
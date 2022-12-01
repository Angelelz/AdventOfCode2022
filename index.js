const fs = require('fs')
const answers = []

answers.push(require("./1.1/index"))
answers.push(require("./1.2/index"))


const stringAnswers = answers.join("\n\n")
console.log(stringAnswers)
fs.writeFileSync("./readme.md", stringAnswers)
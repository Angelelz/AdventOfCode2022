const fs = require('fs')
const answers = []

const dirs = fs.readdirSync("./", {withFileTypes: true})
  .filter(dir => dir.isDirectory() && !dir.name.startsWith("."))
  .map(dir => dir.name)

dirs.forEach(dir => {
  answers.push(require(`./${dir}`).one)
  answers.push(require(`./${dir}`).two)
})


const stringAnswers = answers.join("\n\n")
console.log(stringAnswers)
fs.writeFileSync("./readme.md", stringAnswers)
const fs = require("fs")

const notText = fs.readFileSync("1.1/input.txt")

let tempStr = ""
const n = notText.reduce((arr, notChar) => {
  // console.log(arr)
  if(notChar === 13) {
    // console.log(tempStr, arr)
    const toIn = tempStr
    tempStr = ""
    return [...arr, toIn]
  }
  if (notChar === 10) return arr
  tempStr += String.fromCharCode(notChar)
  return arr
  // console.log(tempStr)
  // arr.push(String.fromCharCode(notChar))
}, [])
let workingArr = []
const nInNumber = n.reduce((acc, str) => {
  
  if (str === "") {
    wArray = [...workingArr]
    workingArr = []
    return [...acc, wArray]
  }
  workingArr.push(Number.parseInt(str))
  return acc
}, [])
// console.log(nInNumber)
const obj = {
  index: 0,
  total: 0
}

const totals = nInNumber.reduce((acc, num) => {
  return [...acc, num.reduce((a,n) => a+n)]
},[]).sort((a,b) => b-a)

const grandTotal = totals[0] + totals[1] + totals[2]

// nInNumber.forEach((item, index) => {
//   const currentTotal = item.reduce((acc, num) => {
//     return acc + num
//   })
//   if (obj.total < currentTotal) {
//     obj.index = index,
//     obj.total = currentTotal
//   }
// })

console.log(`Answer 1.2 is ${grandTotal}`)
// console.log(totals)

module.exports = obj;
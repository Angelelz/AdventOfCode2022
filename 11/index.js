const input = require("./input")
  .split("\n\n")
  .map((monkey) => monkey.split("\n"));

const TOTALROUNDS = 20

const extractItems = (line) => {
  const words = line.split(" ");
  const wLength = words.length;
  const items = [];
  for (let i = 2; i < wLength; i += 1) {
    items.push(Number.parseInt(words[i]));
  }
  return items;
};

const extractOperation = (line) => {
  const words = line.split(" ");
  const oper = words[4];
  const qty = +words[5];
  return isNaN(qty)
    ? oper === "*"
      ? (old) => old * old
      : (old) => old + old
    : oper === "*"
    ? (old) => old * qty
    : (old) => old + qty;
};

class Monkey {
  constructor(data) {
    this.name = data[0].slice(0, -1);
    this.items = extractItems(data[1]);
    this.operation = extractOperation(data[2]);
    this.test = Number.parseInt(data[3].split(" ")[3]);
    this.testTrue = Number.parseInt(data[4].split(" ")[7]);
    this.testFalse = Number.parseInt(data[5].split(" ")[7]);
    this.timesHasInspected = 0
  }
  inspectNext(hasToDivide, newDivider = Infinity) {
    if (this.items.length === 0) return null;
    this.timesHasInspected += 1
    const item = this.items.shift();
    const newWorry = hasToDivide ? Math.floor(this.operation(item) / 3) : (this.operation(item) % newDivider)
    const isDivisible = newWorry % this.test === 0;
    const toMonkey = isDivisible ? this.testTrue : this.testFalse;
    return { toMonkey, item: newWorry };
  }
  insertItem(item) {
    this.items.push(item);
  }
}

const performRound = (monkeys, divideByThree = true, divider = Infinity) => {
  monkeys.forEach((monkey, index, arr) => {
    let newOperation = monkey.inspectNext(divideByThree, divider);
    while (newOperation) {
      arr[newOperation.toMonkey].insertItem(newOperation.item);
      newOperation = monkey.inspectNext(divideByThree, divider);
    }
  });
};

const monkeyArray = [];

input.forEach((monkeyData) => monkeyArray.push(new Monkey(monkeyData)));

let i = 0

while (i < TOTALROUNDS) {
  performRound(monkeyArray);
  i += 1
}

const sortedMonkeyArray = monkeyArray.slice().sort((a, b) => b.timesHasInspected - a.timesHasInspected)

const answer1 = sortedMonkeyArray[0].timesHasInspected * sortedMonkeyArray[1].timesHasInspected;

module.exports.one = `Answer 11.1 is ${answer1}`;

const NEWTOTALROUNDS = 10000

const newMonkeyArray = [];

input.forEach((monkeyData) => newMonkeyArray.push(new Monkey(monkeyData)));

const divider = newMonkeyArray.reduce((total, curr) => total * curr.test, 1)

i = 0

while (i < NEWTOTALROUNDS) {
  performRound(newMonkeyArray, false, divider);
  i += 1
}

const newSortedMonkeyArray = newMonkeyArray.slice().sort((a, b) => b.timesHasInspected - a.timesHasInspected)

const answer2 = newSortedMonkeyArray[0].timesHasInspected * newSortedMonkeyArray[1].timesHasInspected;

module.exports.two = `Answer 11.2 is ${answer2}`;

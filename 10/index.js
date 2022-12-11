const input = require("./input").split("\n");

const MIN = 20,
  MODULE = 40,
  MAX = 220;

let cycle = 1,
  regeX = 1;

const signalStrengths = [];

const isInterestingCycle = (num) => {
  return (num + MIN) % MODULE === 0 && num <= MAX;
};

const doInstruction = (line, isSecond) => {
  if (line.startsWith("addx") && isSecond) {
    regeX += +line.split(" ")[1];
  }
};

const processInstructions = () => {
  let instructions = input.slice();
  while (instructions.length > 0) {
    const instruction = instructions.shift();
    if (isInterestingCycle(cycle)) {
      signalStrengths.push(regeX * cycle);
    }
    doInstruction(instruction, false);
    cycle++;
    if (instruction.startsWith("addx")) {
      if (isInterestingCycle(cycle)) {
        signalStrengths.push(regeX * cycle);
      }
      doInstruction(instruction, true);
      cycle++;
    }
  }
};

processInstructions();

const answer1 = signalStrengths.reduce((prev, curr) => prev + curr, 0);

module.exports.one = `Answer 10.1 is ${answer1}`;

(cycle = 1), (regeX = 1);
let crt = [];

const newProcessInstructions = () => {
  let instructions = input.slice();
  const sprite = (cycle) => ((cycle - 1) % 40);
  let sptritePos = sprite(cycle);
  while (instructions.length > 0) {
    const instruction = instructions.shift();
    sptritePos = sprite(cycle);
    if (sptritePos === 0) crt.push([]);
    const diff = Math.abs(sptritePos - regeX);
    // console.log(diff < 2 ? "#" : ".", sptritePos)
    crt[Math.floor((cycle-1) / 40)][sptritePos] = diff < 2 ? "#" : ".";

    doInstruction(instruction, false);
    cycle++;
    if (instruction.startsWith("addx")) {
      sptritePos = sprite(cycle);
      if (sptritePos === 0) crt.push([]);
      const diff = Math.abs(sptritePos - regeX);
      // console.log(diff < 2 ? "#" : ".", sptritePos)
      crt[Math.floor((cycle-1) / 40)][sptritePos] = diff < 2 ? "#" : ".";
      // crt += diff < 2 ? "#" : ".";
      doInstruction(instruction, true);
      cycle++;
    }
  }
};

newProcessInstructions();

const crtString = crt.reduce((total, line) => total + line.reduce((lineTotal, char) => {
  return lineTotal + char
}, "") + "\n", "").slice(0, -1)

const answer2 = "EJCFPGLH";

module.exports.two = `Answer 10.2 is ${answer2}`;

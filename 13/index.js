const input = require("./input").split("\n\n");

const fullArray = input.map((str2Arr) => {
  return str2Arr.split("\n").map((line) => eval(line));
});

const compare = (arrays, index = 0) => {
  if (
    typeof arrays[0][index] === "number" &&
    typeof arrays[1][index] === "number"
  ) {
    if (arrays[0][index] < arrays[1][index]) return true;
    if (arrays[0][index] > arrays[1][index]) return false;
    return 1;
  }
  if (typeof arrays[0][index] === "number" && Array.isArray(arrays[1][index])) {
    arrays[0][index] = [arrays[0][index]];
    return compare(arrays, index);
  }
  if (typeof arrays[1][index] === "number" && Array.isArray(arrays[0][index])) {
    arrays[1][index] = [arrays[1][index]];
    return compare(arrays, index);
  }
  if (Array.isArray(arrays[0][index]) && Array.isArray(arrays[1][index])) {
    return 2;
  }
  if (
    typeof arrays[0][index] === "undefined" &&
    typeof arrays[1][index] === "undefined"
  ) {
    return 3;
  }
  if (typeof arrays[0][index] === "undefined") return true;
  if (typeof arrays[1][index] === "undefined") return false;
};

const doCompare = (arraysList, indexes = [0]) => {
  const index = indexes.pop();
  const arrays = indexes.reduce((prev, ind) => {
    return [prev[0][ind], prev[1][ind]];
  }, arraysList);
  let result = compare(arrays, index);
  if (result === 1) {
    return doCompare(arraysList, [...indexes, index + 1]);
  } else if (result === 2) {
    return doCompare(arraysList, [...indexes, index, 0]);
  } else if (result === 3) {
    const index2 = indexes.pop();
    return doCompare(arraysList, [...indexes, index2 + 1]);
  } else return result;
};

const pairInOrder = [];

fullArray.forEach((pair, index) => {
  if (doCompare(pair)) pairInOrder.push(index + 1);
});

const answer1 = pairInOrder.reduce((prev, curr) => prev + curr, 0);

module.exports.one = `Answer 13.1 is ${answer1}`;

const newArray = require("./input")
  .split("\n\n")
  .map((str2Arr) => {
    return str2Arr.split("\n").map((line) => eval(line));
  })
  .flat();

newArray.push([[2]]);
newArray.push([[6]]);

newArray.sort((a, b) => (doCompare([a, b]) ? -1 : 1));

const findIndex = (item, num) => {
  if (Array.isArray(item) && item.length === 1) {
    return findIndex(item[0], num);
  }
  if (item === num) return true;
  return false;
};

const i1 =
  newArray.findIndex((item) => item.length === 1 && findIndex(item, 2)) + 1;
const i2 =
  newArray.findIndex((item) => item.length === 1 && findIndex(item, 6)) + 1;

const answer2 = i1 * i2;

module.exports.two = `Answer 13.2 is ${answer2}`;

const input = require("./input").split("\n");

const isEdge = (i, j, sizeI, sizeJ) => {
  if (i === 0 || j === 0 || i === sizeI - 1 || j === sizeJ - 1) return true;
  return false
}

const visibleFromLeft = (y, x, grid) => {
  const self = +grid[y][x]

  for (let i = 0; i < x; i += 1) {
    if (+grid[y][i] >= self) return false
  }

  return true
}

const visibleFromRight = (y, x, grid) => {
  const self = +grid[y][x]
  const width = input[0].length

  for (let i = x + 1; i < width; i += 1) {
    if (+grid[y][i] >= self) return false
  }

  return true
}

const visibleFromTop = (y, x, grid) => {
  const self = +grid[y][x]

  for (let i = 0; i < y; i += 1) {
    if (+grid[i][x] >= self) return false
  }

  return true
}

const visibleFromBottom = (y, x, grid) => {
  const self = +grid[y][x]
  const height = input.length;

  for (let i = y + 1; i < height; i += 1) {
    if (+grid[i][x] >= self) return false
  }

  return true
}

const height = input.length;

const width = input[0].length

const visivility = []

for (let i = 0; i < height; i += 1) {
  for (let j = 0; j < width; j+= 1) {
    if (j === 0) visivility.push([])
    if (isEdge(i, j, height, width)) {
      visivility[i][j] = 1
      continue
    }
    if (visibleFromLeft(i, j, input) || visibleFromRight(i, j, input) || visibleFromTop(i, j, input) || visibleFromBottom(i, j, input)) {
      visivility[i][j] = 1
      continue
    }
    visivility[i][j] = 0
  }
}

let count = 0

for (let i = 0; i < height; i += 1) {
  for (let j = 0; j < width; j+= 1) {
    if (visivility[i][j]) count += 1
  }
}

const answer1 = count

module.exports.one = `Answer 8.1 is ${answer1}`;

const scenicScoreLeft = (y, x, grid) => {
  const self = +grid[y][x]
  let score = 0

  for (let i = x - 1; i >= 0; i -= 1) {
    if (+grid[y][i] < self) {
      score += 1;
      continue
    }
    if (+grid[y][i] >= self) {
      score += 1;
      break
    }
  }

  return score
}

const scenicScoreRight = (y, x, grid) => {
  const self = +grid[y][x]
  const width = input[0].length
  let score = 0

  for (let i = x + 1; i < width; i += 1) {
    if (+grid[y][i] < self) {
      score += 1;
      continue
    }
    if (+grid[y][i] >= self) {
      score += 1;
      break
    }
  }

  return score
}

const scenicScoreTop = (y, x, grid) => {
  const self = +grid[y][x]
  let score = 0

  for (let i = y - 1; i >= 0; i -= 1) {
    if (+grid[i][x] < self) {
      score += 1;
      continue
    }
    if (+grid[i][x] >= self) {
      score += 1;
      break
    }
  }

  return score
}

const scenicScoreBottom = (y, x, grid) => {
  const self = +grid[y][x]
  const height = input.length;
  let score = 0

  for (let i = y + 1; i < height; i += 1) {
    if (+grid[i][x] < self) {
      score += 1;
      continue
    }
    if (+grid[i][x] >= self) {
      score += 1;
      break
    }
  }

  return score
}

const scores = []

for (let i = 0; i < height; i += 1) {
  for (let j = 0; j < width; j+= 1) {
    if (j === 0) scores.push([])
    scores[i][j] = scenicScoreLeft(i, j, input) * scenicScoreRight(i, j, input) * scenicScoreTop(i, j, input) * scenicScoreBottom(i, j, input)
  }
}

let max = 0;

scores.forEach(line => line.forEach(item => max = Math.max(max, item)))

const answer2 = max

module.exports.two = `Answer 8.2 is ${answer2}`;

const input = require("./input").split("\n");
let minutes = 30;
class Valve {
  constructor(name, rate) {
    this.name = name;
    this.rate = rate;
    this.connectsTo = new Set();
    this.open = false;
  }
  addConnection = (name) => {
    this.connectsTo.add(name);
  };
}
class Graph {
  valvesSet = new Set();
  valves = [];
  nonZeroValves = [];
  nonZeroValvesSet = new Set();
  connections = new Set();
  valveExists = (name) => {
    return this.valvesSet.has(name);
  };
  getValve = (name) => {
    const valve = this.valves.filter((valve) => valve.name === name);
    return valve[0];
  };
  addValve = (valve) => {
    if (this.valvesSet.has(valve.name)) return;
    this.valvesSet.add(valve.name);
    this.valves.push(valve);
    if (valve.rate > 0) {
      this.nonZeroValvesSet.add(valve.name);
      this.nonZeroValves.push(valve);
    }
  };
}

const valves = new Graph();

input.forEach((line) => {
  const name = line.split(" ")[1];
  const rate = +line.slice(line.indexOf("=") + 1, line.indexOf(";"));
  const newLine = line.replace("valves", "valve");
  const list = newLine.split("valve ")[1].split(", ");
  const valve = new Valve(name, rate);
  valves.addValve(valve);

  list.forEach((l) => {
    valve.addConnection(l);
    if (valves.valveExists(l)) {
      const endValve = valves.getValve(l);
      endValve.addConnection(name);
    }
  });
});

const dist = {};
const next = {};

for (let i = 0; i < valves.valves.length; i += 1) {
  for (let j = 0; j < valves.valves.length; j += 1) {
    if (i === j) {
      next[`${valves.valves[i].name},${valves.valves[j].name}`] =
        valves.valves[j].name;
      dist[`${valves.valves[i].name},${valves.valves[j].name}`] = 0;
    } else if (valves.valves[i].connectsTo.has(valves.valves[j].name)) {
      next[`${valves.valves[i].name},${valves.valves[j].name}`] =
        valves.valves[j].name;
      dist[`${valves.valves[i].name},${valves.valves[j].name}`] = 1;
    } else {
      dist[`${valves.valves[i].name},${valves.valves[j].name}`] = Infinity;
      next[`${valves.valves[i].name},${valves.valves[j].name}`] = null;
    }
  }
}

for (let k = 0; k < valves.valves.length; k += 1) {
  for (let i = 0; i < valves.valves.length; i += 1) {
    for (let j = 0; j < valves.valves.length; j += 1) {
      const ij = `${valves.valves[i].name},${valves.valves[j].name}`;
      const ik = `${valves.valves[i].name},${valves.valves[k].name}`;
      const kj = `${valves.valves[k].name},${valves.valves[j].name}`;
      if (dist[ij] > dist[ik] + dist[kj]) {
        next[ij] = next[ik];
        dist[ij] = dist[ik] + dist[kj];
      }
    }
  }
}

const getPath = (from, to) => {
  const path = [];
  if (next[`${from},${to}`] === null) return [];
  // path.push(from);
  let current = from;
  while (current !== to) {
    current = next[`${current},${to}`];
    path.push(current);
  }
  return path;
};

const getBestNextValves = (valves, startingFrom, remaining, openedValves) => {
  const bestFlowRates = [];
  valves.nonZeroValves.forEach((valve) => {
    if (!openedValves.has(valve.name)) {
      const newRemaining =
        remaining - dist[`${startingFrom},${valve.name}`] - 1;
      const rate = newRemaining * valve.rate;
      bestFlowRates.push({
        name: valve.name,
        rate,
        remaining: newRemaining,
        test: newRemaining * rate,
      });
    }
  });
  bestFlowRates.sort((a, b) => b.test - a.test);

  return bestFlowRates;
};

const width = 7;

const INITIAL_VALVE = "AA";
let paths = [
  {
    currentValve: INITIAL_VALVE,
    openedValves: new Set(),
    remaining: minutes,
    path: [INITIAL_VALVE],
    flowRate: 0,
  },
];

const developPath = (valves, pathStep) => {
  const bestOnes = getBestNextValves(
    valves,
    pathStep.currentValve,
    pathStep.remaining,
    pathStep.openedValves
  );
  const newSteps = [];
  for (let i = 0; i < width; i += 1) {
    if (bestOnes[i]?.remaining > 0) {
      const newStep = {
        currentValve: bestOnes[i].name,
        openedValves: new Set(pathStep.openedValves).add(bestOnes[i].name),
        remaining: bestOnes[i].remaining,
        path: [
          ...pathStep.path,
          ...getPath(pathStep.currentValve, bestOnes[i].name),
        ],
        flowRate: pathStep.flowRate + bestOnes[i].rate,
      };
      newSteps.push(newStep);
    }
  }
  if (newSteps.length) {
    return newSteps;
  }
  return [pathStep];
};

let newPaths = developPath(valves, paths[0]);

while (paths.length !== newPaths.length) {
  // console.count("while")
  paths = newPaths.map((p) => ({ ...p }));
  newPaths = newPaths.reduce((prev, curr) => {
    const newSteps = developPath(valves, curr);
    return [...prev, ...newSteps];
  }, []);
}

newPaths.sort((a, b) => b.flowRate - a.flowRate);

const answer1 = newPaths[0].flowRate;
console.log(answer1);

module.exports.one = `Answer 16.1 is ${answer1}`;

let minutes2 = 26;

const width2 = 15;

const getBestNextValves2 = (valves, pathStep) => {
  const bestFlowRates = {};
  bestFlowRates.me = getBestNextValves(
    valves,
    pathStep.me.currentValve,
    pathStep.me.remaining,
    pathStep.openedValves
  );
  bestFlowRates.him = getBestNextValves(
    valves,
    pathStep.him.currentValve,
    pathStep.him.remaining,
    pathStep.openedValves
  );

  return bestFlowRates;
};

let paths2 = [
  {
    openedValves: new Set(),
    flowRate: 0,
    me: {
      currentValve: INITIAL_VALVE,
      remaining: minutes2,
      path: [INITIAL_VALVE],
    },
    him: {
      currentValve: INITIAL_VALVE,
      remaining: minutes2,
      path: [INITIAL_VALVE],
    },
  },
];

const nonZeroValves = valves.nonZeroValves.length;

const developPath2 = (pathStep, nextValveList) => {
  const meMaxValue = Math.min(nextValveList.me.length, width2);
  const himMaxValue = Math.min(nextValveList.him.length, width2);

  const newSteps = [];

  for (let i = 0; i < meMaxValue; i += 1) {
    for (let j = 0; j < himMaxValue; j += 1) {
      const ithValveName = nextValveList.me[i].name;
      const jthValveName = nextValveList.him[j].name;
      if (meMaxValue === 1) {
        const ithValve = nextValveList.me[i];
        const jthValve = nextValveList.him[j];
        const newOpenedValves = new Set(pathStep.openedValves);
        if (ithValve.rate > jthValve.rate) {
          newOpenedValves.add(ithValveName);
          newSteps.push({
            openedValves: newOpenedValves,
            flowRate:
              pathStep.flowRate + ithValve.rate,
            me: {
              currentValve: ithValveName,
              remaining: ithValve.remaining,
              path: [
                ...pathStep.me.path,
                ...getPath(pathStep.me.currentValve, ithValveName),
              ],
            },
            him: pathStep.him,
          });
        }
        else {
          newOpenedValves.add(jthValveName);
          newSteps.push({
            openedValves: newOpenedValves,
            flowRate:
              pathStep.flowRate + jthValve.rate,
            him: {
              currentValve: jthValveName,
              remaining: jthValve.remaining,
              path: [
                ...pathStep.him.path,
                ...getPath(pathStep.him.currentValve, jthValveName),
              ],
            },
            me: pathStep.me,
          });
        }
        
      }
      if (ithValveName === jthValveName) continue;
      const ithValve = nextValveList.me[i];
      const jthValve = nextValveList.him[j];
      const newOpenedValves = new Set(pathStep.openedValves);
      newOpenedValves.add(ithValveName);
      newOpenedValves.add(jthValveName);
      newSteps.push({
        openedValves: newOpenedValves,
        flowRate: pathStep.flowRate + ithValve.rate + nextValveList.him[j].rate,
        me: {
          currentValve: ithValveName,
          remaining: ithValve.remaining,
          path: [
            ...pathStep.me.path,
            ...getPath(pathStep.me.currentValve, ithValveName),
          ],
        },
        him: {
          currentValve: jthValveName,
          remaining: jthValve.remaining,
          path: [
            ...pathStep.him.path,
            ...getPath(pathStep.him.currentValve, jthValveName),
          ],
        },
      });
    }
  }
  newSteps.sort((a, b) => b.flowRate - a.flowRate);
  // console.log(newSteps.length)
  const toReturn1 = newSteps.filter(
    (s, index) => index < width2 * 8 && ((index % 2) === 0)
  );
  // const toReturn = newSteps.reduce((prev, curr, index) => {
  //   if (index % 2 === 0 && index < width2) return prev.push(curr)
  // }, [])
  return toReturn1;
};

let nextValves = getBestNextValves2(valves, paths2[0]);

let newPaths2 = developPath2(paths2[0], nextValves);

while (newPaths2[0].openedValves.size < nonZeroValves) {
  let nextNewPaths = [];

  for (let i = 0; i < newPaths2.length; i += 1) {
    nextValves = getBestNextValves2(valves, newPaths2[i]);
    const tempNewPath = developPath2(newPaths2[i], nextValves);
    tempNewPath.forEach((p) => nextNewPaths.push(p));
  }
  paths2 = newPaths2;
  nextNewPaths.sort((a, b) => b.flowRate - a.flowRate);
  if (nextNewPaths.length) {
    newPaths2 = nextNewPaths.slice(0,30000)
  }

  console.count(newPaths2.length);
}

newPaths2.sort((a, b) => b.flowRate - a.flowRate);

const answer2 = newPaths2[0].flowRate;
// console.log(newPaths2[0], newPaths2[1], newPaths2[2])
console.log(answer2);

module.exports.two = `Answer 16.2 is ${answer2}`;

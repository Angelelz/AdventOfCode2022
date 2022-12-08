const input = require("./input").split("\n");

class File {
  constructor(name, size) {
    this.name = name;
    this.size = size;
  }
}

class Dir {
  constructor(name, parent) {
    this.name = name;
    this.dirList = [];
    this.fileList = [];
    this.parent = parent;
    this.size = 0;
  }
  addDir(dir) {
    this.dirList.push(dir);
    this.size += dir.size;
    this.parent?.addSize(dir.size);
  }
  addFile(file) {
    this.fileList.push(file);
    this.size += file.size;
    this.parent?.addSize(file.size);
  }
  addSize(size) {
    this.size += size;
    this.parent?.addSize(size);
  }
}

const parseInstruction = (currentDir, instruction) => {
  const splittedInstruction = instruction.split(" ");
  const instructionParam = splittedInstruction[splittedInstruction.length - 1];
  if (instruction.startsWith("$ cd /")) return new Dir("root", undefined);
  if (instruction.startsWith("$ cd ..")) return currentDir.parent;
  if (instruction.startsWith("$ cd"))
    return currentDir.dirList.filter((dir) => dir.name === instructionParam)[0];
  if (instruction.startsWith("$ ls")) return currentDir;
  if (instruction.startsWith("dir")) {
    const newDir = new Dir(instructionParam, currentDir);
    currentDir.addDir(newDir);
    return currentDir;
  }
  const newFile = new File(instructionParam, +splittedInstruction[0]);
  currentDir.addFile(newFile);
  return currentDir;
};

const constructFileSystem = (commands) => {
  let workingDir;

  for (instruction of commands) {
    workingDir = parseInstruction(workingDir, instruction);
  }

  while (workingDir.parent) {
    workingDir = workingDir.parent;
  }

  return workingDir;
};

const rootDir = constructFileSystem(input);

const listAllDirs = (rootDir) => {
  const dirList = [];

  const visitAllDirs = (dir, cb) => {
    // console.log("current ", dir.name);
    
    cb.push(dir);

    for (d of dir.dirList) {
      visitAllDirs(d, cb);
    }
    // console.log(cb)
  };

  visitAllDirs(rootDir, dirList);

  return dirList;
};

const dirList = listAllDirs(rootDir)

const filteredList = dirList.filter(dir => dir.size <= 100000)

const answer1 = filteredList.reduce((total, curr) => curr.size + total, 0)

module.exports.one = `Answer 7.1 is ${answer1}`;

const TOTALSPACE = 70000000, TOTALREQUIRED = 30000000

const currentlyAvailable = TOTALSPACE - rootDir.size;

const currentlyNeeded = TOTALREQUIRED - currentlyAvailable;

const sortedDirs = dirList.slice().sort((a, b) => a.size - b.size)

let dirToDelete;

for (let dir of sortedDirs) {
  if (dir.size >= currentlyNeeded) {
    dirToDelete = dir;
    break
  }
}

const answer2 = dirToDelete.size;

module.exports.two = `Answer 7.2 is ${answer2}`;

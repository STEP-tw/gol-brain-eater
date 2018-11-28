let read = require('readline-sync');
let {getCellPos,
  generate2DGrid,
  extractNeighbourElements,
  duplicate2dGrid,
  convertTo1D,
  displayGrid
} = require('./util.js');


const getGridDetails = function() {
  let gridSize = parseInt(getGridSize());
  let aliveCells = getAliveCells().split(',');
  return {gridSize, aliveCells};
};

const getGridSize = function() {
  return read.question('Enter grid size:\n');
};

const getAliveCells = function() {
  return read.question('Enter alive cell positions seperated by "," :\n');
};

const generateGrid = function(size, aliveCells) {
  let grid = generate2DGrid(size, size);
  for (let pos of aliveCells) {
    let {row, column} = getCellPos(pos,grid.length);
    grid[row][column] = 1;
  }
  return grid;
};

exports.generateGrid = generateGrid;

const startGame = function() {
  const {gridSize, aliveCells} = getGridDetails();
  let grid = generateGrid(gridSize, aliveCells);
  console.log(displayGrid(grid) + '\n');
  let iterations = parseInt(read.question('Enter number of iterations:\n'));
  while (iterations) {
    iterateGrid(grid);
    console.log(displayGrid(grid)+"\n");
    iterations--;
  }
}

exports.startGame = startGame;

const countNeighbours = function(row, column, grid) {
  let cell = grid[row][column];
  let neighbours = extractNeighbours(row,column,grid);
  let AliveNbs = convertTo1D(neighbours).filter(x=>x==1);
  return AliveNbs.length-cell;
};

exports.countNeighbours = countNeighbours;


const extractNeighbours = function(row,column,Array_2D){
  let extractNbWithColumn = extractNeighbourElements.bind(null,column);
  return  extractNeighbourElements(row,Array_2D).map(extractNbWithColumn);
}
exports.extractNeighbours = extractNeighbours;

const iterateGrid = function(grid) {
  let gridSize = grid.length;
  let currentState = duplicate2dGrid(grid);
  for (let row = 0; row < gridSize; row++) {
    for (let column = 0; column < gridSize; column++) {
      let noOfNeighbours = countNeighbours(row, column, currentState);
      if (noOfNeighbours != 2 ) {
        grid[row][column] = evaluateStatus(noOfNeighbours);
      }
    }
  }
};

exports.iterateGrid = iterateGrid;

const evaluateStatus = function(noOfNeighbours){
  if (noOfNeighbours == 3) {
    return 1;
  }
  return 0;
}

exports.evaluateStatus = evaluateStatus;

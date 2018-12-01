let {
  generate2DGrid,
  extractNeighbourhoodElements,
  convertToLinear,
  displayGrid
} = require('./util.js');


const generateAliveCell = function(grid,cellCoordinates){
  grid[cellCoordinates[0]][cellCoordinates[1]] = 1;
  return grid;
}

const generateGrid = function(dimensions, aliveCells) {
  let {length,breadth} = dimensions;
  let grid = generate2DGrid(length, breadth);
  grid = aliveCells.reduce(generateAliveCell,grid);
  return grid;
};

exports.generateGrid = generateGrid;

const countAliveNeighbours = function(row, column, grid) {
  let cell = grid[row][column];
  let neighbours = extractNeighbours(row,column,grid);
  let aliveNeighbours = convertToLinear(neighbours).filter(x=>x==1);
  return aliveNeighbours.length-cell;
};

exports.countAliveNeighbours = countAliveNeighbours;


const extractNeighbours = function(row,column,matrix){
  let extractNeighboursOfColumn = extractNeighbourhoodElements.bind(null,column);
  return  extractNeighbourhoodElements(row,matrix).map(extractNeighboursOfColumn);
}
exports.extractNeighbours = extractNeighbours;

const updateStatus = function(grid,row,column){
  let noOfNeighbours = countAliveNeighbours(row, column, grid);
  let cellStatus = grid[row][column];
  cellStatus = evaluateStatus(noOfNeighbours,cellStatus); 
  return cellStatus;
}

const iterateGrid = function(dimensions,aliveCells) {
  let {length,breadth} = dimensions;
  let grid = generateGrid(dimensions,aliveCells);
  let nextGen = [];
  for (let row = 0; row < length; row++) {
    for (let column = 0; column < breadth; column++) {
      updateStatus(grid,row,column) == 1 && nextGen.push([row,column]);
   }
  }
  return nextGen;
};

exports.iterateGrid = iterateGrid;

const evaluateStatus = function(noOfNeighbours,cellStatus){
  let willRemainAlive = noOfNeighbours == 2 && cellStatus;
  let willLive  = noOfNeighbours == 3 && 1;
  return willRemainAlive || willLive || 0;
}

exports.evaluateStatus = evaluateStatus;

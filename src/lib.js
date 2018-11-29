let {getCellPos,
  generate2DGrid,
  extractNeighbourElements,
  duplicate2dGrid,
  convertTo1D,
  displayGrid
} = require('./util.js');


const generateGrid = function(dimensions, aliveCells) {
  let {length,breadth} = dimensions;
  let grid = generate2DGrid(length, breadth);
  for (let position of aliveCells) {
    let row = position[0];
    let column = position[1];
    grid[row][column] = 1;
  }
  return grid;
};

exports.generateGrid = generateGrid;

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

const iterateGrid = function(dimensions,aliveCells) {
  let {length,breadth} = dimensions;
  let grid = generateGrid(dimensions,aliveCells);
  let nextGen = [];
  for (let row = 0; row < length; row++) {
    for (let column = 0; column < breadth; column++) {
      let noOfNeighbours = countNeighbours(row, column, grid);
      let cellStatus = grid[row][column];
      cellStatus = evaluateStatus(noOfNeighbours,cellStatus); 
      if(cellStatus == 1){
        nextGen.push([row,column]);
      }
    }
  }
  return nextGen;
};

exports.iterateGrid = iterateGrid;

const evaluateStatus = function(noOfNeighbours,cellStatus){
  if(noOfNeighbours == 2){
    return cellStatus;
  }
  if (noOfNeighbours == 3) {
    return 1;
  }
  return 0;
}

exports.evaluateStatus = evaluateStatus;

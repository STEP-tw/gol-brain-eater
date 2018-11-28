let {
  generateGrid,
  iterateGrid
} = require("./lib.js");

const mapCoordinatesToNum = function(coordinates,bounds){
  let size = getGridSize(bounds);
  let getPositionsOfSquare = getPositions(size);
  return coordinates.map(getPositionsOfSquare);
}

const getGridSize = function(bounds){
  let {topLeft,bottomRight} = bounds;
  let rows = bottomRight[0]-topLeft[0];
  let columns = bottomRight[1]-topLeft[1];
  return Math.max(rows,columns) + 1;
}

const getPositions = function(size){
  return function(coordinates){
    let row = coordinates[0];
    let column = coordinates[1];
    return (row*size)+column+1;
  }
}
const isBetween = function(number,lowerLimit,upperLimit){
  return number >= lowerLimit && number <= upperLimit;
}

const isPositionValid = function(bounds){
  return function(coordinates){
    let {topLeft,bottomRight} = bounds;
    let isRowValid = isBetween(coordinates[0],topLeft[0],bottomRight[0]);
    let isColumnValid = isBetween(coordinates[1],topLeft[1],bottomRight[1]);
    return isRowValid && isColumnValid;
  }
}


const getAliveCellPositions = function(grid,bounds){
  let alivePositions = [];
  let {topLeft,bottomRight} = bounds;
  for(let row = topLeft[0] ; row < bottomRight[0]  ; row++){
    for(let column = topLeft[1]; column < bottomRight[1];column++){
      if(grid[row][column] == 1){
        alivePositions.push([row,column]);
      }
    }
  }
  return alivePositions;
}

const nextGeneration = function(currGeneration,bounds) {
  let currAlivePositions = currGeneration.slice();
  let isPositionBetweenBounds = isPositionValid(bounds);
  currAlivePositions = currAlivePositions.filter(isPositionBetweenBounds)
  let alivePositions = mapCoordinatesToNum(currAlivePositions,bounds);
  let size = getGridSize(bounds);
  let grid = generateGrid(size,alivePositions);
  iterateGrid(grid);
  return getAliveCellPositions(grid,bounds);
}

module.exports = { nextGeneration };

let {iterateGrid} = require('./lib.js');

const subtractCoordinates = function(firstCoordinate, secondCoordinate) {
  let x =  secondCoordinate[0]-firstCoordinate[0] ;
  let y =  secondCoordinate[1]-firstCoordinate[1] ;
  return [x, y];
};

const addCoordinates = function(firstCoordinate, secondCoordinate) {
  let x = firstCoordinate[0] + secondCoordinate[0];
  let y = firstCoordinate[1] + secondCoordinate[1];
  return [x, y];
};

const isLessThan = function(limitCoordinate, coordinate) {
  return (
    limitCoordinate[0] >= coordinate[0] && limitCoordinate[1] >= coordinate[1]
  );
};

const mapCoordinatesFromOrigin = function(startingPoint, coordinates) {
  let subtractCoordinatesFromStart = subtractCoordinates.bind(
    null,
    startingPoint
  );
  let validCoordinates = coordinates.map(subtractCoordinatesFromStart);
  return validCoordinates;
};

const validateCoordinates = function(bottomRight, coordinates) {
  let validCoordinates = coordinates.filter(x => x[0] >= 0 && x[1] >= 0); //remove negative coordinates
  let isLessThanBottomRight = isLessThan.bind(null, bottomRight);
  validCoordinates = validCoordinates.filter(isLessThanBottomRight);
  return validCoordinates;
};

const mapCoordinates = function(point, coordinates) {
  let mapCoordinatesFromPoint = addCoordinates.bind(null, point);
  return coordinates.map(mapCoordinatesFromPoint);
};

const getDimensions = function(topLeft,bottomRight){
  let length = bottomRight[0] - topLeft[0] + 1;
  let breadth = bottomRight[1] - topLeft[1] + 1;
  return {length,breadth};
}

const nextGeneration = function(currGeneration, bounds) {
  let {topLeft, bottomRight} = bounds;
  let currentAliveCells = currGeneration.slice();
  let {length,breadth} = getDimensions(topLeft,bottomRight);
  currentAliveCells = mapCoordinatesFromOrigin(topLeft, currentAliveCells);
  let bottomRightFromOrigin = [length - 1, breadth - 1];
  currentAliveCells = validateCoordinates(
    bottomRightFromOrigin,
    currentAliveCells,
  );
  let nextGen = iterateGrid({length, breadth}, currentAliveCells);
  return mapCoordinates(topLeft,nextGen);
};

module.exports = {nextGeneration,getDimensions};

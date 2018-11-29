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

const nextGeneration = function(currGeneration, bounds) {
  let {topLeft, bottomRight} = bounds;
  let currAlivePositions = currGeneration.slice();
  let length = bottomRight[0] - topLeft[0] + 1;
  let breadth = bottomRight[1] - topLeft[1] + 1;
  currAlivePositions = mapCoordinatesFromOrigin(topLeft, currAlivePositions);
  let bottomRightFromOrigin = [length - 1, breadth - 1];
  currAlivePositions = validateCoordinates(
    bottomRightFromOrigin,
    currAlivePositions,
  );
  let nextGen = iterateGrid({length, breadth}, currAlivePositions);
  return mapCoordinates(topLeft,nextGen);
};

module.exports = {nextGeneration};

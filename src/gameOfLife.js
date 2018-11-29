let {iterateGrid} = require('./lib.js');

const nextGeneration = function(currGeneration, bounds) {
  let {topLeft, bottomRight} = bounds;
  let currAlivePositions = currGeneration.slice();
  let length = bottomRight[0] - topLeft[0] + 1;
  let breadth = bottomRight[1] - topLeft[1] + 1;
  let nextGen = iterateGrid({length,breadth},currAlivePositions);
  return nextGen;
};

module.exports = {nextGeneration};

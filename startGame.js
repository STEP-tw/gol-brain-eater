const sleep = require('sleep').msleep;
const read = require('readline-sync').question;
const { generateGrid } = require("./src/lib.js");
const { displayGrid } = require("./src/util.js");
const { getDimensions , nextGeneration}= require('./src/gameOfLife.js');

const main = function() {
  let topLeft = JSON.parse(read('Enter topLeft bound of grid in format "[x,y]":\n'));
  let bottomRight = JSON.parse(read('Enter bottomRight bound of grid in format "[x,y]":\n'));
  let dimensions = getDimensions(topLeft,bottomRight);
  let bounds = {topLeft,bottomRight};
  let currGen = JSON.parse(read('Enter aliveCells in format "[[x1,y1],[x2,y2]]":\n'));
  let iterations = parseInt(read('Enter number of iterations:\n'));
  while(iterations) {
    let nextGen = nextGeneration(currGen,bounds);
    let grid = generateGrid(dimensions,nextGen);
    console.log(displayGrid(grid));
    currGen = nextGen;
    iterations--;
    sleep(400);
  }
}

main();

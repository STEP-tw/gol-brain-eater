const deepEqual = require('assert').deepEqual;
let {
  evaluateStatus,
  iterateGrid,
  countAliveNeighbours,
  extractNeighbours,
  generateGrid} = require('../src/lib.js');

describe('generateGrid', function() {
  it('should take grid size and alive cells and return grid', function() {
    deepEqual(generateGrid({length:1,breadth:1},[[0,0]]), [[1]]);
    deepEqual(generateGrid({length:0,breadth:0},[]), []);
    deepEqual(generateGrid({length:1,breadth:2},[[0,1]]), [[0,1]]);
    deepEqual(generateGrid({length:2,breadth:2},[[0,1]]), [[0, 1], [0, 0] ]);
    deepEqual(generateGrid({length:2,breadth:3}, [[0,0],[1,1],[0,2]]), [[1, 0, 1], [0, 1, 0]]);
  });
});


describe('countAliveNeighbours', function() {
  it('should return no of neighbours of given cell', function() {
    deepEqual(countAliveNeighbours(1, 1, [[0, 1, 1], [1, 1, 1], [1, 1, 1]]), 7);
    deepEqual(countAliveNeighbours(0, 0, [[0, 1, 1], [1, 1, 1], [1, 1, 1]]), 3);
    deepEqual(countAliveNeighbours(2, 0, [[0, 0, 0], [0, 0, 0], [0, 0, 0]]), 0);
    deepEqual(countAliveNeighbours(0, 2, [[0, 0, 1], [1, 1, 0], [0, 0, 0]]), 1);
  });
});

describe ( 'extractNeighbours' , function() {
  it( 'should return all the neighbours for the given cell' , function() {
    deepEqual(extractNeighbours(0,0,[[0,1,1],[0,1,1],[0,1,1]]),[ [ 0, 1 ], [ 0, 1 ] ]);
    deepEqual(extractNeighbours(1,1,[[0,1,1],[0,1,1],[0,1,1]]),[ [ 0, 1 ,1], [ 0, 1 ,1],[0,1,1] ]);
  });
})

describe( 'iterateGrid'  , function() {
  it( 'should iterate the square grid to next generations' , function() {
    let dimensions = {length:2,breadth:2};
    let aliveCells = [[0,1],[1,0]];
    let expectedOutput = [];
    deepEqual(iterateGrid(dimensions,aliveCells),expectedOutput);

    dimensions = {length:3,breadth:3};
    aliveCells = [[0,1],[0,2],[1,0],[2,0],[2,2]];
    expectedOutput = [ [ 0, 1 ], [ 1, 0 ], [ 1, 2 ], [ 2, 1 ] ];
    deepEqual(iterateGrid(dimensions,aliveCells),expectedOutput);
  });
  it( 'should iterate the rectangular grid to next generation' , function() {
    let dimensions = {length:1,breadth:2};
    let aliveCells = [[0,0],[0,1]];
    let expectedOutput = [];
    deepEqual(iterateGrid(dimensions,aliveCells),expectedOutput);
    dimensions = {length:2,breadth:3};
    aliveCells = [[0,0],[0,2],[1,1]];
    expectedOutput = [[0,1],[1,1]];
    deepEqual(iterateGrid(dimensions,aliveCells),expectedOutput);
  });
});

describe( 'evaluateStatus' , function() {
  it( 'it should evaluate the state of the cell using number of its neighbours' , function() {
    deepEqual(evaluateStatus(1),0);
    deepEqual(evaluateStatus(3),1);
  });
})

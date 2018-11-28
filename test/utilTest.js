const deepEqual = require('assert').deepEqual;
const {displayGrid,
      duplicate2dGrid,
      getCellPos,
      convertTo1D,
      extractNeighbourElements,
       generate2DGrid} = require('../src/util.js');

describe( 'generate2DGrid' , function() {
  it( 'should return a grid of given row and column' , function() {
    deepEqual(generate2DGrid(2,2),[[0,0],[0,0]]);
  });
})

describe('displayGrid', function() {
  it('should return string representing grid', function() {
    deepEqual(displayGrid([[1], [1]]),' 1 \n--------\n 1 ');
    deepEqual(displayGrid([[1, 2], [1, 2]]),' 1 | 2 \n--------\n 1 | 2 ');
  });
});

describe( 'getCellPos' , function() {
  it( 'should return the row and column for given cell' , function() {
    deepEqual(getCellPos(1,3),{row:0,column:0});
    deepEqual(getCellPos(5,3),{row:1,column:1});
    deepEqual(getCellPos(9,3),{row:2,column:2});
  });})

describe( 'convertTo1D' ,function() {
  it( 'should take 2D array and convert it to 1D' , function() {
    deepEqual(convertTo1D([[1,2],[1,2]]),[1,2,1,2]);
    deepEqual(convertTo1D([[1],[2]]),[1,2]);
  });
})

describe( 'extractNeighbourElements' , function() {
  it( 'should take an array and position and returns array of its neighbour elements' , function() {
    deepEqual(extractNeighbourElements(0,[1,2,3]),[1,2]);
    deepEqual(extractNeighbourElements(1,[1,2,3]),[1,2,3]);
    deepEqual(extractNeighbourElements(2,[1,2,3]),[2,3]);
  });
})

describe('duplicate2dGrid', function() {
  it('should return duplicate of the given grid', function() {
    deepEqual(duplicate2dGrid([[1, 2], [1, 2]]), [[1, 2], [1, 2]]);
    deepEqual(duplicate2dGrid([[], []]), [[], []]);
    deepEqual(duplicate2dGrid([[]]), [[]]);
  });
});


const deepEqual = require('assert').deepEqual;
const {displayGrid,
      convertTo1D,
      extractNeighbourElements,
       generate2DGrid} = require('../src/util.js');

describe( 'generate2DGrid' , function() {
  it( 'should return a grid of given row and column' , function() {
    deepEqual(generate2DGrid(2,2),[[0,0],[0,0]]);
    deepEqual(generate2DGrid(1,1),[[0]]);
    deepEqual(generate2DGrid(0,0),[]);
    deepEqual(generate2DGrid(1,2),[[0,0]]);
  });
})

describe('displayGrid', function() {
  it('should return string representing grid', function() {
    deepEqual(displayGrid([[1], [1]]),' ▓ \n--------\n ▓ ');
    deepEqual(displayGrid([[1, 0], [1, 0]]),' ▓ |   \n--------\n ▓ |   ');
    deepEqual(displayGrid([[1, 1]]),' ▓ | ▓ ');
    deepEqual(displayGrid([[0, 0]]),'   |   ');
    deepEqual(displayGrid([]),'');
  });
});

describe( 'convertTo1D' ,function() {
  it( 'should take 2D array and convert it to 1D' , function() {
    deepEqual(convertTo1D([[1,2],[1,2]]),[1,2,1,2]);
    deepEqual(convertTo1D([[1],[1]]),[1,1]);
    deepEqual(convertTo1D([[1],[2]]),[1,2]);
    deepEqual(convertTo1D([[],[]]),[]);
  });
})

describe( 'extractNeighbourElements' , function() {
  it( 'should take an array and position and returns array of its neighbour elements' , function() {
    deepEqual(extractNeighbourElements(0,[1,2,3]),[1,2]);
    deepEqual(extractNeighbourElements(1,[1,2,3]),[1,2,3]);
    deepEqual(extractNeighbourElements(2,[1,2,3]),[2,3]);
  });
})

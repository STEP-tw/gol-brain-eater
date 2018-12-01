
const deepEqual = require('assert').deepEqual;
const {displayGrid,
      convertToLinear,
      extractNeighbourhoodElements,
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

describe( 'convertToLinear' ,function() {
  it( 'should take 2D array and convert it to Linear' , function() {
    deepEqual(convertToLinear([[1,2],[1,2]]),[1,2,1,2]);
    deepEqual(convertToLinear([[1],[1]]),[1,1]);
    deepEqual(convertToLinear([[1],[2]]),[1,2]);
    deepEqual(convertToLinear([[],[]]),[]);
  });
})

describe( 'extractNeighbourhoodElements' , function() {
  it( 'should take an array and position and returns array of its neighbourhood elements' , function() {
    deepEqual(extractNeighbourhoodElements(0,[0,1,2]),[0,1]);
    deepEqual(extractNeighbourhoodElements(1,[0,1,2]),[0,1,2]);
    deepEqual(extractNeighbourhoodElements(2,[0,1,2]),[1,2]);
  });
})

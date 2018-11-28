const generate2DGrid = function(rows,columns){
  let grid = new Array(rows).fill(rows);
  grid = grid.map(x=> new Array(x).fill(0));
  return grid;
}

const justify= function(arr){
  return arr.map(x=> " "+x+" ");
}

exports.justify = justify;


const displayGrid = function(gridValues) {
  let line = new Array(gridValues.length).fill("----").join("");
  let grid = gridValues.map((a)=>justify(a).join("|"))
  return grid.join('\n'+line+'\n');
};

const getCellPos = function(pos,size) {
  let row = parseInt((pos - 1) / size);
  let column = (pos - 1) % size;
  return {row, column};
}

const convertTo1D= function(Array_2D){
  return Array_2D.reduce((x,y)=>x.concat(y));
}

const extractNeighbourElements = function(pos,array){
  let extractedArray = [];
  extractedArray.push(array[pos-1]);
  extractedArray.push(array[pos]);
  extractedArray.push(array[pos+1]);
  return extractedArray.filter(x=>x!=undefined);
}

const duplicate2dGrid = function(grid){
  return grid.map(x=>x.slice());
}

exports.duplicate2dGrid = duplicate2dGrid;

exports.extractNeighbourElements = extractNeighbourElements;

exports.convertTo1D = convertTo1D;

exports.getCellPos = getCellPos;

exports.displayGrid = displayGrid;

exports.generate2DGrid = generate2DGrid;  





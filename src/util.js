const generate2DGrid = function(rows,columns){
  let grid = new Array(rows).fill(columns);
  grid = grid.map(x=> new Array(x).fill(0));
  return grid;
}

const replaceWithRect = function(elements){
  return elements.map(x=>x==1?'▓':' ');
}

const justify= function(elements){
  return elements.map(x=> " "+x+" ");
}

exports.justify = justify;


const displayGrid = function(grid) {
  console.clear();
  let line = new Array(grid.length).fill("----").join("");
  let displayableGrid = grid.map(replaceWithRect)
  displayableGrid = displayableGrid.map((a)=>justify(a).join("|"))
  return displayableGrid.join('\n'+line+'\n');
};

const convertTo1D= function(matrix){
  return matrix.reduce((x,y)=>x.concat(y));
}

const extractNeighbourElements = function(position,elements){
  let extractedArray = [];
  extractedArray.push(elements[position-1]);
  extractedArray.push(elements[position]);
  extractedArray.push(elements[position+1]);
  return extractedArray.filter(x=>x!=undefined);
}


exports.extractNeighbourElements = extractNeighbourElements;

exports.convertTo1D = convertTo1D;

exports.displayGrid = displayGrid;

exports.generate2DGrid = generate2DGrid;  





const grid = document.querySelector('.swipe-box');
const wh = 4;
var gridSquare = [];
let tiles = [
  'url(img/puzzel-0.png)',
  'url(img/puzzel-0.png)',
  'url(img/puzzel-0.png)',
  'url(img/puzzel-0.png)',
  'url(img/puzzel-0.png)',
  'url(img/puzzel-1.png)',
  'url(img/puzzel-0.png)',
  'url(img/puzzel-1.png)',
  'url(img/puzzel-1.png)',
  'url(img/puzzel-1.png)',
  'url(img/puzzel-1.png)',
  'url(img/puzzel-0.png)',
  'url(img/puzzel-0.png)',
  'url(img/puzzel-1.png)',
  'url(img/puzzel-1.png)',
  'url(img/puzzel-1.png)',
];
const init = () => {
  gridSquare = [];
  for (let i = 0; i < wh * wh; i++) {
    let tile = document.createElement('div');
    tile.setAttribute('draggable', true);
    tile.setAttribute('id', i);
    tile.style.backgroundImage = `${tiles[i]}`;
    tile.style.backgroundSize = '100%';
    tile.addEventListener('dragstart', dragStart);
    tile.addEventListener('dragend', dragEnd);
    tile.addEventListener('dragover', dragOver);
    tile.addEventListener('dragenter', dragEnter);
    tile.addEventListener('drageleave', dragLeave);
    tile.addEventListener('drop', dragDrop);
    grid.appendChild(tile);
    gridSquare.push(tile);
  }
};

init();
let imageBeingDragged;
let imageBeingReplaced;
let tileBeingDragged;
let tileBeingReplaced;
function dragStart() {
  imageBeingDragged = this.style.backgroundImage;
  tileBeingDragged = parseInt(this.id);
}
function dragEnd() {
  gridSquare[tileBeingReplaced].style.backgroundImage = imageBeingDragged;
  gridSquare[tileBeingDragged].style.backgroundImage = imageBeingReplaced;
  tileBeingReplaced = null;
}
function dragOver(e) {
  e.preventDefault();
}
function dragEnter(e) {
  e.preventDefault();
}
function dragLeave() {
  this.style.background = '';
}
function dragDrop() {
  imageBeingReplaced = `${this.style.background}  no-repeat center`;
  tileBeingReplaced = parseInt(this.id);
}
/* 
  Step 1: Make grid layout 
    - Id for all tiles ✅
    - Make a grid with spots where tiles can be placed ✅
    - Make layout that has correct location for each tiles 
    - Make function that checks tile id is correct with grid id ✅

  Step 2: Create right rotation of tiles
    - Create rotation classes ✅
  Step 3: Swipe functions 
    - Swap up ✅
    - Swap down ✅
    - Swap left ✅
    - Swap right ✅
    - function that finds tile id's around 
    - Check is swipe is greater than id tiles around it
 

*/

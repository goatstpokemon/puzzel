// ----------------------------- SETUP ------------------------------------------------------------
var dialog = document.querySelector('.modal');
var winDialog = document.querySelector('.winmodal');
const grid = document.querySelector('.swipe-box');
const ignore = document.querySelector('.ignore');
const wh = 4;
var gridSquare = [];
const body = document.querySelector('body');

let endTiles = [
  // Row 1
  'url("img/puzzel-4.avif")',
  'url("img/puzzel-7.avif")',
  'url("img/puzzel-8.avif")',
  'url("img/puzzel-0.avif")',
  // Row 2
  'url("img/puzzel-0.avif")',
  'url("img/puzzel-1.avif")',
  'url("img/puzzel-7.avif")',
  'url("img/puzzel-4.avif")',
  // Row 3
  'url("img/puzzel-3.avif")',
  'url("img/puzzel-2.avif")',
  'url("img/puzzel-2.avif")',
  'url("img/puzzel-0.avif")',
  // Row 4
  'url("img/puzzel-0.avif")',
  'url("img/puzzel-8.avif")',
  'url("img/puzzel-1.avif")',
  'url("img/puzzel-3.avif")',
];
let startTiles = [
  // Row 1

  'url(img/puzzel-4.avif)',
  'url(img/puzzel-7.avif)',
  'url(img/puzzel-8.avif)',
  'url(img/puzzel-0.avif)',

  // Row 2
  'url(img/puzzel-7.avif)',
  'url(img/puzzel-2.avif)',
  'url(img/puzzel-7.avif)',
  'url(img/puzzel-0.avif)',
  // Row 3
  'url(img/puzzel-3.avif)',
  'url(img/puzzel-2.avif)',
  'url(img/puzzel-1.avif)',
  'url(img/puzzel-0.avif)',
  // Row 4
  'url(img/puzzel-4.avif)',
  'url(img/puzzel-8.avif)',
  'url(img/puzzel-1.avif)',
  'url(img/puzzel-3.avif)',
];
let imageBeingDragged;
let imageBeingReplaced;
let tileBeingDragged;
let tileBeingReplaced;

// --------------------------------------- Desktop -----------------------------------------------
const init = () => {
  openDialog();
  for (let i = 0; i < wh * wh; i++) {
    let tile = document.createElement('div');
    tile.setAttribute('id', i);
    tile.style.backgroundImage = `${startTiles[i]}`;
    tile.style.backgroundSize = '100%';
    if (
      tile.style.backgroundImage.toString().toUpperCase() ===
      'url("img/puzzel-8.png")'.toString().toUpperCase()
    ) {
      tile.setAttribute('draggable', false);
    } else {
      tile.setAttribute('draggable', true);
      tile.addEventListener('dragstart', dragStart);
      tile.addEventListener('dragend', dragEnd);
      tile.addEventListener('dragover', dragOver);
      tile.addEventListener('dragenter', dragEnter);
      tile.addEventListener('drageleave', dragLeave);
      tile.addEventListener('drop', dragDrop);
    }
    grid.appendChild(tile);
    gridSquare.push(tile);
  }
};

function dragStart() {
  imageBeingDragged = this.style.backgroundImage;
  tileBeingDragged = parseInt(this.id);
}
function dragEnd() {
  const validMoves = [
    tileBeingDragged - wh,
    tileBeingDragged + wh,
    tileBeingDragged + 1,
    tileBeingDragged - 1,
  ];
  let validMove = validMoves.includes(tileBeingReplaced);
  if (tileBeingReplaced && validMove) {
    gridSquare[tileBeingReplaced].style.backgroundImage = imageBeingDragged;
    gridSquare[tileBeingDragged].style.backgroundImage = imageBeingReplaced;
    tileBeingReplaced = null;
  } else {
    gridSquare[tileBeingDragged].style.backgroundImage = tileBeingDragged;
  }
  won();
}
function dragOver(e) {
  e.preventDefault();
}
function dragEnter(e) {
  e.preventDefault();
}
function dragLeave() {
  this.style.backgroundImage = '';
}
function dragDrop() {
  imageBeingReplaced = this.style.backgroundImage;
  tileBeingReplaced = parseInt(this.id);
}
// --------------------------------------- Mobile -----------------------------------------------
const initMobile = () => {
  for (let i = 0; i < wh * wh; i++) {
    let tile = document.createElement('div');
    tile.setAttribute('id', i);
    tile.style.backgroundImage = `${startTiles[i]}`;
    tile.style.backgroundSize = '100%';
    if (
      tile.style.backgroundImage.toString().toUpperCase() ===
      'url("img/puzzel-8.png")'.toString().toUpperCase()
    ) {
      tile.setAttribute('draggable', false);
    } else {
      tile.setAttribute('draggable', true);
      tile.addEventListener('pointerdown', down);
    }
    grid.appendChild(tile);
    gridSquare.push(tile);
  }
};

function down(event) {
  imageBeingDragged = this.style.backgroundImage;
  tileBeingDragged = parseInt(this.id);
  this.style.left = `${this.getBoundingClientRect().left}px`;
  this.style.top = `${this.getBoundingClientRect().top}px`;

  const clone = this.cloneNode();
  this.before(clone);
  this.classList.add('move');

  // document.body.append(tileBeingDragged);
  this.style.pointerEvents = 'none';
  this.setPointerCapture(event.pointerId);

  [...gridSquare].forEach((square) => {
    square.addEventListener('pointermove', move);
    square.addEventListener('pointerup', up);

    if (parseInt(square.id) != parseInt(tileBeingDragged)) {
      if (
        square.style.backgroundImage.toString().toUpperCase() ===
        'url("img/puzzel-8.png")'.toString().toUpperCase()
      ) {
        return;
      } else {
        square.setAttribute('placable', true);
      }
    } else {
      return;
    }
  });

  function move(event) {
    this.style.left = `${parseFloat(this.style.left) + event.movementX}px`;
    this.style.top = `${parseFloat(this.style.top) + event.movementY}px`;
    const hitTest = document.elementFromPoint(
      parseFloat(this.style.left),
      parseFloat(this.style.top)
    );

    const dropzone = hitTest.closest('[placable]');
    if (!dropzone) {
      return;
    }
    imageBeingReplaced = dropzone.style.backgroundImage;
    tileBeingReplaced = parseInt(dropzone.id);
  }

  function up(event) {
    clone.remove();
    this.style.top = '';
    this.style.left = '';
    this.classList.remove('move');

    const validMoves = [
      tileBeingDragged - wh,
      tileBeingDragged + wh,
      tileBeingDragged + 1,
      tileBeingDragged - 1,
    ];
    let validMove = validMoves.includes(tileBeingReplaced);
    if (tileBeingReplaced && validMove) {
      gridSquare[tileBeingReplaced].style.backgroundImage = imageBeingDragged;
      gridSquare[tileBeingDragged].style.backgroundImage = imageBeingReplaced;
      tileBeingReplaced = null;
    } else {
      gridSquare[tileBeingDragged].style.backgroundImage = tileBeingDragged;
    }
    this.style.pointerEvents = '';
    this.releasePointerCapture(event.pointerId);
    [...gridSquare].forEach((square) => {
      square.removeAttribute('placable');
    });
    won();
  }
}
// --------------------------------------- END Mobile -----------------------------------------------

if ('ontouchstart' in document.documentElement) {
  initMobile();
} else {
  init();
}

function reset() {
  location.reload();
}
function won() {
  if (
    gridSquare[0].style.backgroundImage.toString().toUpperCase() ===
      endTiles[0].toString().toUpperCase() &&
    gridSquare[4].style.backgroundImage.toString().toUpperCase() ===
      endTiles[4].toString().toUpperCase() &&
    gridSquare[5].style.backgroundImage.toString().toUpperCase() ===
      endTiles[5].toString().toUpperCase() &&
    gridSquare[6].style.backgroundImage.toString().toUpperCase() ===
      endTiles[6].toString().toUpperCase() &&
    gridSquare[7].style.backgroundImage.toString().toUpperCase() ===
      endTiles[7].toString().toUpperCase() &&
    gridSquare[8].style.backgroundImage.toString().toUpperCase() ===
      endTiles[8].toString().toUpperCase() &&
    gridSquare[9].style.backgroundImage.toString().toUpperCase() ===
      endTiles[9].toString().toUpperCase() &&
    gridSquare[11].style.backgroundImage.toString().toUpperCase() ===
      endTiles[11].toString().toUpperCase() &&
    gridSquare[15].style.backgroundImage.toString().toUpperCase() ===
      endTiles[15].toString().toUpperCase()
  ) {
    showwinDialog();
  }
}

function openDialog() {
  dialog.showModal();
}
function closeDialog() {
  dialog.close();
}

function showwinDialog() {
  winDialog.showModal();
  localStorage.level3 = 'true';
  update();
}
function closeWinDialog() {
  winDialog.close();
}

const swipeBox = document.getElementsByClassName('swipe-box');

const init = () => {
  swipeBox[0].innerHTML = '';
  let start = [
    `<img src='./public/img/puzzel-1.png' class="r-90" id="1"  alt="puzzel-1">`,
    `<img src='./public/img/puzzel-0.png' class="r-90" id="2"  alt="puzzel-0">`,
    `<img src='./public/img/puzzel-0.png' class="blank" id="3"  alt="puzzel-blank">`,
    `<img src='./public/img/puzzel-0.png'  id="4"  alt="puzzel-0">`,
    `<img src='./public/img/puzzel-0.png'  id="5"  alt="puzzel-0">`,
    `<img src='./public/img/puzzel-1.png'  id="6"  alt="puzzel-1">`,
    `<img src='./public/img/puzzel-0.png' class="r-90" id="7"  alt="puzzel-0">`,
    `<img src='./public/img/puzzel-1.png' class="r-90" id="8"  alt="puzzel-1">`,
    `<img src='./public/img/puzzel-1.png' class="r-180 flip" id="9"  alt="puzzel-1">`,
    `<img src='./public/img/puzzel-1.png' class="r-90 flip" id="10"  alt="puzzel-1">`,
    `<img src='./public/img/puzzel-1.png' class="r-180" id="11"  alt="puzzel-1">`,
    `<img src='./public/img/puzzel-0.png'  id="12"  alt="puzzel-1">`,
    `<img src='./public/img/puzzel-0.png'  id="13"  alt="puzzel-1">`,
    `<img src='./public/img/puzzel-1.png' class="blank" id="14"  alt="puzzel-blank">`,
    `<img src='./public/img/puzzel-1.png' class="r-270 " id="15"  alt="puzzel-1">`,
    `<img src='./public/img/puzzel-1.png' class="r-180 flip" id="16"  alt="puzzel-1">`,
  ];

  for (let i = 0; i < 16; i++) {
    swipeBox[0].innerHTML += `<div class='tile flex-container flex-center' id="${i}"> ${start[i]}</div>`;
  }
};

init();

start.forEach(tile => tile.addEventListener('dragstart', dragStart))
start.forEach(tile => tile.addEventListener('dragend', dragEnd))
start.forEach(tile => tile.addEventListener('dragover', dragOver))
start.forEach(tile => tile.addEventListener('dragenter', dragEnter))
start.forEach(tile => tile.addEventListener('drageleave', dragLeave))
start.forEach(tile => tile.addEventListener('drop', dragDrop))

const dragOver = (e) => {
    e.preventDefault()
}

const dragEnter = (e) =>  {
    e.preventDefault()
}

const dragLeave = () => {

}

const dragDrop = () => {
    colorBeingReplaced = this.style.backgroundImage
    squareIdBeingReplaced = parseInt(this.id)
    this.style.backgroundImage = colorBeingDragged
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced
}

const dragEnd = () => {
    //What is a valid move?
    let validMoves = [squareIdBeingDragged -1 , squareIdBeingDragged -width, squareIdBeingDragged +1, squareIdBeingDragged +width]
    let validMove = validMoves.includes(squareIdBeingReplaced)

    if (squareIdBeingReplaced && validMove) {
        squareIdBeingReplaced = null
    }  else if (squareIdBeingReplaced && !validMove) {
       squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced
       squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
    } else  squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
}

//drop candies once some have been cleared
const moveIntoSquareBelow = () => {
    for (i = 0; i < 55; i ++) {
        if(squares[i + width].style.backgroundImage === '') {
            squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
            squares[i].style.backgroundImage = ''
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            const isFirstRow = firstRow.includes(i)
            if (isFirstRow && (squares[i].style.backgroundImage === '')) {
              let randomColor = Math.floor(Math.random() * candyColors.length)
              squares[i].style.backgroundImage = candyColors[randomColor]
            }
        }
    }
/* 
  Step 1: Make grid layout 
    - Id for all tiles ✅
    - Make a grid with spots where tiles can be placed ✅
    - Make layout that has correct location for each tiles
    - Make function that checks tile id is correct with grid id

  Step 2: Create right rotation of tiles
    - Create rotation classes
  Step 3: Swipe functions 
    - Swap up
    - Swap down
    - Swap left
    - Swap right
    - function that finds tile id's around 
    - Check is swipe is greater than id tiles around it
 

*/

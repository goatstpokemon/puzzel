const swipeBox = document.getElementsByClassName('swipe-box');
const init = () => {
  let gridLayout = [];

  // for (let i = 1; i < 17; i++) {
  //   swipeBox[0].innerHTML += `<div class='tile flex-container flex-center'> <img src='./public/img/puzzel-1.png' alt="puzzel-1" id="${i}"></div>`;
  // }
};

init();

/* 
  Step 1: Make grid layout 
    - Id for all tiles
    - Make a grid with spots where tiles can be placed
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

const swipeBox = document.getElementsByClassName('swipe-box');
const init = () => {
  for (let i = 0; i < 16; i++) {
    swipeBox[0].innerHTML += `<div class='tile flex-container flex-center'><p>${i}</p></div>`;
  }
};

init();

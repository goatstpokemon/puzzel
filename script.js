const nextButton = document.querySelectorAll('.volgende');
const dialogs = document.querySelectorAll('.second');
var counter = 0;
const startingMinutes = 2;
let time = startingMinutes * 60;
const countdownEL = document.getElementById('countdown');
let score = -1;
let scorePlayer = document.getElementById('score-player');
const box = document.querySelectorAll('.box');
var dialog = document.querySelector('.modal');
var winDialog = document.querySelector('.winmodal');
localStorage.setItem('level1', 'false');
localStorage.setItem('level2', 'false');
localStorage.setItem('level3', 'false');

function update() {
  var pb = document.getElementsByClassName('.progress_bar');
  pb.style.width = 1;
  if (localStorage.getItem('level1') === 'true') {
    console.log(localStorage.getItem('level1'));
    pb.style.width = 33;
  }
  if (
    localStorage.getItem('level2') === true &&
    localStorage.getItem('level1') === true
  ) {
    pb.style.width = 66;
  }
  if (
    localStorage.getItem('level1') === true &&
    localStorage.getItem('level2') === true &&
    localStorage.getItem('level3') === true
  ) {
    pb.style.width = 100;
  }
}

function nextSection() {
  let e = document.getElementById('second');
  e.scrollIntoView({
    block: 'end',
    behavior: 'smooth',
    inline: 'center',
  });
}
function nextText() {
  let e = document.getElementById('two');
  counter += 1;
  for (i = 0; i < dialogs.length; i++) {
    if (i === counter) {
      dialogs[i].classList.remove('hidden');
    } else {
      dialogs[i].classList.add('hidden');
    }
  }
  if (counter === 5) {
    e.scrollIntoView({
      block: 'end',
      behavior: 'smooth',
      inline: 'center',
    });

    setInterval(updateCountdown, 1000);
  }
}

function updateCountdown() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  seconds = seconds < 10 ? '0' + seconds : seconds;

  countdownEL.innerHTML = minutes + ':' + seconds;
  if (minutes == 0 && seconds == 0) {
  } else {
    time--;
  }
}

function changeColor() {
  let win = document.getElementById('three');
  for (let i = 0; i < box.length; i++) {
    box[i].addEventListener('click', (e) => {
      e.target.style.color = '#D86C46';
    });
  }
  if (score !== 7) {
    score += 1;
    scorePlayer.textContent = score;
  }
  if (score === 7) {
    win.scrollIntoView({
      block: 'end',
      behavior: 'smooth',
      inline: 'center',
    });
    localStorage.level1 = 'true';
    update();
  }
}

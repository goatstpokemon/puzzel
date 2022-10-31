const nextButton = document.querySelectorAll('.volgende');
const dialogs = document.querySelectorAll('.second');
var counter = 0;
const startingMinutes = 2;
let time = startingMinutes * 60;
const countdownEL = document.getElementById('countdown');
let score = -1;
let scorePlayer = document.getElementById('score-player');
const box = document.querySelectorAll('.box');
function nextText() {
  let e = document.getElementById('two');
  counter += 1;
  console.log(counter);
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
  }

  console.log(score);
}

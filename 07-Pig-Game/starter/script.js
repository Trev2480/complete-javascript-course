'use strict';
//variables
const roll = document.querySelector('.btn--roll');
const dice = document.querySelector('.dice');
const hold = document.querySelector('.btn--hold');
const reset = document.querySelector('.btn--new');
let score1 = document.querySelector('#score--0');
let score2 = document.getElementById('score--1');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
score1.textContent = 0;
score2.textContent = 0;

let scores, currentScore, activePlayer, playing;

//Hide the dice initially - Make inital function.
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
  score1.textContent = 0;
  score2.textContent = 0;

  dice.classList.add('hidden');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player2.classList.remove('player--active');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};
init();

//Switch active player
const switchActivePlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

//check Win condition
const checkWin = function () {
  if (
    Number(document.getElementById(`score--${activePlayer}`).textContent) >= 100
  ) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    dice.classList.add('hidden');
    playing = false;
  }
};

//reset game
reset.addEventListener('click', init);

//On dice button click
roll.addEventListener('click', function () {
  if (playing) {
    //create random number and set dice pic
    let randNum = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${randNum}.png`;
    dice.classList.remove('hidden');

    if (randNum !== 1) {
      currentScore += randNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchActivePlayer();
    }
  }
});
//clicking the hold button
hold.addEventListener('click', function () {
  if (playing) {
    //add current score to AP score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check if player won
    checkWin();
    switchActivePlayer();
  }
});

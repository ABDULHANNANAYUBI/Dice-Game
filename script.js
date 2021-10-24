// Copyright : Abdul Hannan Ayubi
'use strict';
// These are for getting the score and select it with DOM
const score1El = document.querySelector('#score--0');
const score2El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const activePlayer0El = document.querySelector('.player--0');
const activePlayer1El = document.querySelector('.player--1');

// Starting condition
let currentScore, activePlayer, statusOfGame, scores;
const init = function () {
  // real values

  score1El.textContent = 0;
  score2El.textContent = 0;
  currentScore = activePlayer = 0;
  statusOfGame = true;
  scores = [0, 0];
  // background values
  score1El.textContent = 0;
  score2El.textContent = 0;
  document.getElementById(`current--${0}`).textContent = 0;
  document.getElementById(`current--${1}`).textContent = 0;
  // background colors
  activePlayer0El.classList.remove('player--winner');
  activePlayer1El.classList.remove('player--winner');
  activePlayer0El.classList.add('player--active');
  activePlayer1El.classList.remove('player--active');
  diceEl.classList.remove('hidden');
};
init();
/// swithcing the user
const switchUser = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  activePlayer0El.classList.toggle('player--active');
  activePlayer1El.classList.toggle('player--active');
};

// Show dice when the button is clicked
diceEl.classList.add('hidden');
const showDice = function () {
  //cheking if we are playing or not
  if (statusOfGame) {
    //generate a random number
    const randomNumber = Math.trunc(Math.random() * 6) + 1;
    //Showing the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randomNumber}.png`;

    /// Checking the conditions
    if (randomNumber !== 1) {
      currentScore += randomNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    // check the random number is one
    // if its one than change the player...
    else {
      switchUser();
    }
  }
};
btnRoll.addEventListener('click', showDice);
btnHold.addEventListener('click', function () {
  //checking if we are playing or not
  if (statusOfGame) {
    //adding the active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // if the score is 100 or more the current player win
    if (scores[activePlayer] >= 100) {
      // finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      statusOfGame = false;
      diceEl.classList.add('hidden');
    } else {
      switchUser();
    }
  }
});

btnNew.addEventListener('click', init);

'use strict';

//Selecting elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0EL = document.querySelector('current--0');
const current1EL = document.querySelector('current--1');

let currentScore,activePlayer,playing,scores;

//Starting Conditions

const init = function(){
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0EL.textContent=0;
    score1EL.textContent=0;
    //current0EL.textContent=0;
    //current1EL.textContent=0;

    diceEl.classList.add('hidden');
    player0EL.classList.remove('player--winner');
    player1EL.classList.remove('player--winner');
    player0EL.classList.add('player--active');
    player1EL.classList.remove('player--active');
};
init();

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent=0;
    currentScore=0;
    activePlayer=activePlayer===0?1:0;
    player0EL.classList.toggle('player--active');
    player1EL.classList.toggle('player--active');
}

//Rolling Dice functionalities
btnRoll.addEventListener('click',function(){
    if(playing){
    //1.Roll the dice
    const dice = Math.trunc(Math.random()*6)+1;

    //2.display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3.check for rolled
    if(dice!==1){
        //Add dice to the current score
        currentScore+=dice;
        document.getElementById(`current--${activePlayer}`).textContent=currentScore;
        // current0EL.textContent=currentScore;
    }else{
        //switch to the next player
        switchPlayer();
    }
}    

})


btnHold.addEventListener('click',function(){
    if(playing){
    //add current score to activeplayer's score
    scores[activePlayer]+=currentScore;
    document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer];

    //check if player's score>=100
    if(scores[activePlayer]>=20){    
    //Finish the game
    playing=false;
    diceEl.classList.add('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    }
    //switch to the next player
    switchPlayer();
    }
})

btnNew.addEventListener('click',init);  
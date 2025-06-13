const state = {
    view:{
        square:document.querySelectorAll('.square'),
        enemy:document.querySelector('.enemy'),
        timeLeft:document.querySelector('#time-left'),
        score:document.querySelector('#score'),
        lives: document.querySelector('#lives'),
        gameOver:document.querySelector('#gameOver'),
         highScore: document.querySelector('#high-score'), // 👈 aqui


},
values:{ 
   
    gameVelocity: 1000,
    hitPosition:0,
    result:0,
    currentTime: 60,
    lives: 3,
    highScore: localStorage.getItem('highScore') || 0, // 👈 aqui
},
actions:{
     timerId: setInterval(randomSquare, 1000),
    countDownTimerId:setInterval(countDown, 1000),
}
};
function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.timerId);
        clearInterval(state.actions.countDownTimerId);

        // Verifica se houve novo recorde
        if (state.values.result > state.values.highScore) {
            state.values.highScore = state.values.result;
            localStorage.setItem('highScore', state.values.highScore);
            state.view.highScore.textContent = state.values.highScore;

            state.view.gameOver.innerHTML = `🎉 PARABÉNS, NOVO RECORD!! <br> Sua pontuação: ${state.values.result}`;
        } else {
            state.view.gameOver.innerHTML = `⏱️ Game Over <br> Sua pontuação: ${state.values.result}`;
        }

        state.view.gameOver.style.display = 'block';
        playSound("gameover");
    }
}


function playSound(audioName){
    let audio = new Audio(`../src/audio/${audioName}.mp4`);
    audio.volume = 0.2;
    audio.play();
}
function randomSquare(){
    state.view.square.forEach((square) => {
        square.classList.remove('enemy');
    });
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.square[randomNumber];
    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;
}

// function moveEnemy(){
//   state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
// }
// 
function addListenerHitBox() {
  state.view.square.forEach((square) => {
    square.addEventListener('mousedown', () => {
      // Acertei o inimigo
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
      } else {
        // Cliquei no lugar errado
        state.values.lives--;
        state.view.lives.textContent = state.values.lives;
        playSound("erro");

        // Se as vidas acabarem, Game Over
        if (state.values.lives <= 0) {
          clearInterval(state.actions.timerId);
          clearInterval(state.actions.countDownTimerId);

          state.view.gameOver.innerHTML = `GAME OVER! <br> Your score is ${state.values.result}`;
          
          state.view.gameOver.style.display = 'flex';
          playSound("gameover");
        }
      }
    });
  });
}

function initialize(){
    // moveEnemy();
    addListenerHitBox();
    

}
initialize();
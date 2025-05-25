import { FPS } from "./config.js"
import { space } from "./space.js"
import { ship } from "./ship.js"

import { Laser } from "./laser.js";  

import { createLife, loseLife } from "./life.js" 
import { score } from "./score.js"  
import { Speed } from "./speed.js";  


import { createRandomEnemyShip, moveEnemyShips,enemyShips } from "./enemyShip.js"
import { createRandomEnemyMeteor, moveEnemyMeteors,enemyMeteors } from "./enemyMeteor.js"
import { createRandomEnemyUFO, moveEnemyUFOs, enemyUFOs } from "./enemyUFO.js"

let gameStarted = false;
let gamePaused = false; 

let lasers = []

export const speed = new Speed();

let speedIncreaseInterval;

let runInterval = null; // guardar o intervalo do loop principal

 



function init() {
  createInitialLives(); 
  score.updateDisplay();
  let spacePressed = false;


  window.addEventListener("keydown", (e) => {
    if (e.key === " " && !gameStarted) { // press space to start
      startGame(); 
    }
    // pause event
    if (e.key === "p") {
      togglePause(); 
    }

    // change ship direction events
    if (e.key === "ArrowLeft") ship.changeDirection(-1)
    if (e.key === "ArrowRight") ship.changeDirection(+1)

    //pow pow pow
    if (e.key === " " && gameStarted && !gamePaused  && !spacePressed) {
      spacePressed = true;
      shootLaser();
      
    }
  });

  window.addEventListener("keyup", (e) => {
    if (e.key === " ") {
      spacePressed = false;
    }
  }); 
}

function shootLaser() {
  const xPosition = parseInt(ship.element.style.left) + 46; // centraliza o tiro na nave
  const laser = new Laser(xPosition); // cria o tiro
  lasers.push(laser); // add o tiro ao array de tiros
}


// speed --------------------
const increaseSpeed = () => {
  if (!gamePaused) {
    speed.increase();  // 
  }
};


function startSpeedIncrease() {
  // chama função increaseSpeed a cada 1000ms (1 segundo)
  speedIncreaseInterval = setInterval(increaseSpeed, 1000);
}

function stopSpeedIncrease() {
  clearInterval(speedIncreaseInterval);  // p/ o intervalo de aumento de velocidade
}

// speed --------------------

//START
function startGame(){
  gameStarted = true;
  startSpeedIncrease();

  if (runInterval) {
    clearInterval(runInterval); // limpa intervalo antigo para não acumular
  }
  runInterval = setInterval(run, 1000 / FPS)
}

//PAUSE
function togglePause() {
  gamePaused = !gamePaused; 
  if (gamePaused) {
    console.log("Jogo pausado");
    stopSpeedIncrease();  
  } else {
    console.log("Jogo retomado");
    startSpeedIncrease();
  }
}


function createInitialLives() {
  for (let i = 0; i < 3; i++) {
    createLife(); 
  }
}




function run() {
  if (!gameStarted || gamePaused) return;
  space.move()
  ship.move()

  // create enemies
  createRandomEnemyShip()
  createRandomEnemyMeteor()
  createRandomEnemyUFO()
  //move enemies
  moveEnemyShips()
  moveEnemyMeteors()
  moveEnemyUFOs()
  
  /// colisão
  checkShipCollision()
  // pow pow
  lasers = lasers.filter(laser => {
    if (laser.move()) {
      laser.element.remove();
      return false;  // remove o laser se ele sair da tela
    }
    if (!laser.collided) {
        checkCollisions(laser);
      }
    return !laser.collided;
  });



  if (ship.livesCount <= 0) {
      endGame(); // função de fim de jogo
      return;
    }
}

function checkShipCollision() {
  if (ship.isDamaged) return; // impede a colisão enquanto a nave estiver danificada

  const enemies = [...enemyShips, ...enemyMeteors, ...enemyUFOs];
  for (const enemy of enemies) {
    if (ship.checkCollision(enemy)) { // check colisão entre a nave e o inimigo
      console.log("colisao")
      
      ship.hitByObstacle(); //  dano e chama a função de perder vida
      loseLife();
      break; // evita múltiplas colisões no mesmo frame
    }
  }
}



function checkCollisions(laser) {


  if (checkCollisionsWithEnemies(laser, enemyShips)) return;
  if (checkCollisionsWithEnemies(laser, enemyMeteors)) return;
  if (checkCollisionsWithEnemies(laser, enemyUFOs)) return;


}

function checkCollisionsWithEnemies(laser, enemiesArray) {
  if (laser.collided) return false;

  for (let i = enemiesArray.length - 1; i >= 0; i--) {
    const enemy = enemiesArray[i];
    if (enemy.checkCollision(laser)) {
      laser.collided = true;
      enemiesArray.splice(i, 1);

    
      score.increase(enemy.points ?? 0);
      return true;
    }
  }

  return false;
}

function clearEnemies() {
  // remove todos os inimigos do DOM
  enemyShips.forEach(e => e.element.remove());
  enemyMeteors.forEach(e => e.element.remove());
  enemyUFOs.forEach(e => e.element.remove());

  // limpa os arrays
  enemyShips.length = 0;
  enemyMeteors.length = 0;
  enemyUFOs.length = 0;
}


function endGame() {


  gamePaused = true;     
  const modal = document.getElementById("gameOverModal");
  modal.style.display = "flex"
  

  const restartBtn = document.getElementById("restartBtn");

  restartBtn.onclick = () => {
    modal.style.display = "none";  
    resetGame();                 
    gamePaused = false;            
    startGame();                 
  };
}

function resetGame() {
    // reset lives + score + enemies + interval + speed interval

  if (runInterval) {
    clearInterval(runInterval);
    runInterval = null;
  }
  clearInterval(speedIncreaseInterval);

  stopSpeedIncrease();

  clearEnemies()
  ship.reset();

  gameStarted = false;
  gamePaused = false;

  speed.reset();

  score.points = 0; 
  createInitialLives(); 
  score.updateDisplay(); 
}


init();
// enemyUFO.js
import { PROB_ENEMY_UFO, max,min } from "./config.js";
import Enemy from './enemy.js'; 
import { speed } from "./game.js";  

class EnemyUFO extends Enemy{
  constructor() {
    const speedValue  = Math.random() * (max - min) + min;

    super("assets/png/enemyUFO.png"); 
    this.element.className = "enemy-ufo"
    
    this.speed = speedValue  * speed.getMultiplier();  
    this.points = 20;
  }

  move() {
    let currentTop = parseFloat(this.element.style.top);
    this.element.style.top = `${currentTop + this.speed}px`; // movimento para baixo

    if (currentTop > window.innerHeight) {
      this.element.remove(); 
    }
  }
}

export const enemyUFOs = [];

export const createRandomEnemyUFO = () => {
  if (Math.random() < PROB_ENEMY_UFO) {
    enemyUFOs.push(new EnemyUFO());  // UFO aleatório
  }
};

export const moveEnemyUFOs = () => {
  enemyUFOs.forEach(e => e.move());  
};

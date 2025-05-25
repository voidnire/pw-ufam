import { PROB_ENEMY_SHIP, max, min} from "./config.js"
import Enemy from './enemy.js'; 
import { speed } from "./game.js";  

class EnemyShip extends Enemy{
  constructor() {
    const speedValue  = Math.random() * (max - min) + min;

    super("assets/png/enemyShip.png"); 
    this.element.className = "enemy-ship"
    this.speed = speedValue  * speed.getMultiplier();  
    this.points = 50;
  }
  move() {
    let currentTop = parseFloat(this.element.style.top);  
    this.element.style.top = `${currentTop + this.speed}px`; 

    if (currentTop > window.innerHeight) {
      this.element.remove();
    }
  }


  onHit(laser) {
    super.onHit(laser);  // lógica padrão de remoção do inimigo
  }

}

export const enemyShips = []


export const createRandomEnemyShip = () => {
  if (Math.random() < PROB_ENEMY_SHIP) 
    enemyShips.push(new EnemyShip())
}

export const moveEnemyShips = () => {
  enemyShips.forEach(e => e.move())
}
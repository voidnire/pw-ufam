import { PROB_ENEMY_METEOR, max,min } from "./config.js"
import Enemy from './enemy.js'; 
import { speed } from "./game.js";  

const sizes = [
  "assets/png/meteorBig.png",
  "assets/png/meteorSmall.png",
]

class EnemyMeteor extends Enemy{
  constructor() {
    const speedValue  = Math.random() * (max - min) + min;

    const size=Math.floor(Math.random() * 2);
    //this.size = size
    super(sizes[size]); 
    this.element.className = "enemy-meteor"
    this.speed = speedValue  * speed.getMultiplier();  // velocidade multiplicada pelo speedMultiplier
    this.size = size;  // 0 = grande, 1 = pequeno
    this.points = size === 0 ? 10 : 100;
  }
  move() {
    let currentTop = parseFloat(this.element.style.top);  //  parseFloat p garantir a precisão
    this.element.style.top = `${currentTop + this.speed}px`;

    if (currentTop > window.innerHeight) {
      this.element.remove();
    }
  }
}

export const enemyMeteors = [] 

export const createRandomEnemyMeteor = () => {
  if (Math.random() < PROB_ENEMY_METEOR) 
    enemyMeteors.push(new EnemyMeteor())
} 

export const moveEnemyMeteors = () => {
  enemyMeteors.forEach(e => e.move());
} 
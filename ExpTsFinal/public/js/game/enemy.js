// enemy.js
import { TAMX } from "./config.js";
import { space } from "./space.js";

class Enemy {
  constructor(imageSrc) {
    if (this.constructor === Enemy) {
      throw new Error("Cannot instantiate abstract class 'Enemy'");
    }

    this.element = document.createElement("img");
    this.element.className = "enemy";
    this.element.src = imageSrc;  
    this.element.style.position = "absolute";
    this.element.style.top = `${-Math.random() * 200}px`;
    this.element.style.left = `${Math.random() * TAMX}px`;  

    space.element.appendChild(this.element);  
  }

  move() {
    throw new Error("Subclass must implement abstract method 'move'");
  }

  checkCollision(laser) {
    const laserRect = laser.element.getBoundingClientRect();
    const enemyRect = this.element.getBoundingClientRect();

    //  se o laser atingiu o inimigo
    if (
      laserRect.left < enemyRect.right &&
      laserRect.right > enemyRect.left &&
      laserRect.top < enemyRect.bottom &&
      laserRect.bottom > enemyRect.top
    ) {
      // colisão detectada
      this.onHit(laser);
      return true;
    }

    return false;
  }

  onHit(laser) {
    // quando o inimigo é atingido
    laser.element.remove();
    this.element.remove();
  }


}



export default Enemy;

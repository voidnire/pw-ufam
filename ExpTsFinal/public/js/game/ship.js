import { TAMX } from "./config.js"
import { space } from "./space.js"

const directions = [
  "assets/png/playerLeft.png",
  "assets/png/player.png",
  "assets/png/playerRight.png",
  "assets/png/playerDamaged.png"
]

class Ship {
  constructor() {
    this.element = document.createElement("img")
    this.element.id = "ship"
    this.direction = 1
    this.element.src = directions[this.direction]
    this.element.style.bottom = "20px"


    const width = window.innerWidth;
    this.element.style.left= `${width / 2 - 50}px`

    space.element.appendChild(this.element)

    this.element.onload = () => {
      this.width = this.element.naturalWidth; // largura original da imagem
    }

    // controle de vidas e danos
    this.livesCount = 3;
    this.isDamaged = false;
    this.damageTimeout = null;


  }


  changeDirection(giro) { // -1 +1
    if (this.isDamaged) {
      // durante o dano, a nave pode mudar de direção, mas a imagem de dano se mantém
      if (this.direction + giro >= 0 && this.direction + giro <= 2)
        this.direction = this.direction + giro;
      return;
    }


    if (this.direction + giro >= 0 && this.direction + giro <= 2)
      this.direction = this.direction + giro
    
    
      this.element.src = directions[this.direction];
  }

  move() {
    const currentLeft = parseInt(this.element.style.left);

    const width = window.innerWidth;

    if (this.direction === 0 && currentLeft > 0){
      this.element.style.left = `${currentLeft - 2}px`; // 2px de movimento
    }
    if (this.direction === 2 && currentLeft + this.width < width) {
      this.element.style.left = `${currentLeft + 2}px`; // 2px de movimento
    }
  }


  checkCollision(enemy) {
    const shipRect = this.element.getBoundingClientRect();
    const enemyRect = enemy.element.getBoundingClientRect();

    return !(
      shipRect.right < enemyRect.left ||
      shipRect.left > enemyRect.right ||
      shipRect.bottom < enemyRect.top ||
      shipRect.top > enemyRect.bottom
    );
  }

  hitByObstacle() {
    if (this.isDamaged) return; 
  
    this.livesCount--;
  
    this.isDamaged = true; 
    this.element.src = directions[3]; 
  
    if (this.damageTimeout) clearTimeout(this.damageTimeout);
  
    this.damageTimeout = setTimeout(() => {
      this.element.src = directions[this.direction]; 
      this.isDamaged = false; 
    }, 5000); 
  }
  
  reset() {
    if (this.damageTimeout) {
      clearTimeout(this.damageTimeout);
      this.damageTimeout = null;
    }

    this.livesCount = 3;
    this.isDamaged = false;
    this.direction = 1; 
    this.element.src = directions[this.direction];

    // centro
    const width = window.innerWidth;
    this.element.style.left = `${width / 2 - 50}px`;
  }

}

export const ship = new Ship()
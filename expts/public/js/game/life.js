//import { TAMX, PROB_ENEMY_SHIP } from "./config.js"
import { space } from './space.js';

class Life {
  constructor(index) {
    this.element = document.createElement('img');
    this.element.className = 'life';
    this.element.src = 'assets/png/life.png';
    this.element.style.position = 'absolute';
    this.element.style.top = '22px';
    this.element.style.right = `${130 + index * 40}px`;
    space.element.appendChild(this.element);
  }

  remove() {
    // remove o elemento da DOM quando a vida é perdida
    this.element.remove();
  }
}

const lives = [];

export const createLife = () => {
  const index = lives.length; // posição da nova vida com base no número de vidas
  const life = new Life(index);

  lives.push(life);
};

export const loseLife = () => {
  const lostLife = lives.pop();
  if (lostLife) lostLife.remove(); // remove o elemento visual da DOM
};

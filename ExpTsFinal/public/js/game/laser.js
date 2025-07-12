export class Laser {
  constructor(xPosition) {
    this.element = document.createElement("img");
    this.element.className = "laser";
    this.element.style.position = "absolute";
    this.element.style.bottom = "100px"; 
    this.element.style.left = `${xPosition}px`; 
    
    this.element.src = "assets/png/laserGreen.png"

    document.body.appendChild(this.element); //  o tiro ao corpo do documento
    this.element.style.transition = "none"; // rmv qualquer transição CSS que possa causar atraso
  
}

  move() {
    let currentBottom = parseInt(this.element.style.bottom);
    this.element.style.bottom = `${currentBottom + 10}px`; //p subir


    if (currentBottom > window.innerHeight) {
      this.element.remove();
      return true;  // o laser deve ser removido do array
    }
    return false;

  }

  hit(target) {
    const laserRect = this.element.getBoundingClientRect();
    const targetRect = target.element.getBoundingClientRect();

    return (
      laserRect.left < targetRect.right &&
      laserRect.right > targetRect.left &&
      laserRect.top < targetRect.bottom &&
      laserRect.bottom > targetRect.top
    );
  }
}


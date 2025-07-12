export class Speed {
  constructor(initialMultiplier = 1, increaseRate = 0.2) {
    this.multiplier = initialMultiplier; // multiplicador de velocidade inicial
    this.increaseRate = increaseRate; // taxa de aumento da velocidade
    this.elapsedTime = 0; // time do jogo em segundos
  }

  // método para aumentar a velocidade a cada minuto
  increase() {
    this.elapsedTime++;
    if (this.elapsedTime % 60 === 0) {  // A cada 60 segundos (1 minuto)
      this.multiplier += this.increaseRate; 
      console.log(`Velocidade aumentada! Novo multiplicador: ${this.multiplier}`);
    }
  }

  // para obter a velocidade atual (multiplicador)
  getMultiplier() {
    return this.multiplier;
  }

  reset() {
    this.multiplier = 1; 
    this.increaseRate = 0.2;
    this.elapsedTime = 0 ;
  }
}

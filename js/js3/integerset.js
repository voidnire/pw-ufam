class IntegerSet {
    constructor(maxValue) {
      //  array de booleanos para representar o conjunto de inteiros
      this.maxValue = maxValue;
      this.set = Array(maxValue + 1).fill(false); // Inicializa todos os valores como 'false'
    }
  
    // adicionar um inteiro ao conjunto
    add(value) {
      if (value >= 0 && value <= this.maxValue) {
        this.set[value] = true;
      }
    }
  
    //  remover um inteiro do conjunto
    remove(value) {
      if (value >= 0 && value <= this.maxValue) {
        this.set[value] = false;
      }
    }
  
    //  verificar se um valor está no conjunto
    contains(value) {
      return value >= 0 && value <= this.maxValue && this.set[value];
    }
  
    //  realizar a união de dois conjuntos
    union(otherSet) {
      let result = new IntegerSet(this.maxValue);
      for (let i = 0; i <= this.maxValue; i++) {
        if (this.set[i] || otherSet.set[i]) {
          result.add(i);
        }
      }
      return result;
    }
  
    //  realizar a interseção de dois conjuntos
    intersection(otherSet) {
      let result = new IntegerSet(this.maxValue);
      for (let i = 0; i <= this.maxValue; i++) {
        if (this.set[i] && otherSet.set[i]) {
          result.add(i);
        }
      }
      return result;
    }
  
    //  realizar a diferença de dois conjuntos
    difference(otherSet) {
      let result = new IntegerSet(this.maxValue);
      for (let i = 0; i <= this.maxValue; i++) {
        if (this.set[i] && !otherSet.set[i]) {
          result.add(i);
        }
      }
      return result;
    }
  
    //  converter o conjunto em uma string
    toString() {
      let result = [];
      for (let i = 0; i <= this.maxValue; i++) {
        if (this.set[i]) {
          result.push(i);
        }
      }
      return `{ ${result.join(", ")} }`;
    }
  }

console.log("Olá.");
  // Testando 
let btt= document.getElementById("btt");

function teste(){
    console.log("Teste iniciado.");
    let set1 = new IntegerSet(100); //  máximo valor = 100
  set1.add(23);
  set1.add(76);
  console.log("Conjunto 1:", set1.toString());
  
  let set2 = new IntegerSet(100);
  set2.add(14);
  set2.add(89);
  console.log("Conjunto 2:", set2.toString());
  
   let set3 = new IntegerSet(100);
  set3.add(31);
  set3.add(62);
  set3.add(28);
  console.log("Conjunto 3:", set3.toString());


  let set4 = new IntegerSet(100);
  set4.add(31);
  set4.add(23);
  set4.add(12);
  console.log("Conjunto 4:", set4.toString());


  let unionSet = set1.union(set2);
  console.log("União sets 1 e 2:", unionSet.toString());
  
  let unionSet2 = set1.union(set3);
  console.log("União sets 1 e 3:", unionSet.toString());


  let intersectionSet = set1.intersection(set4);
  console.log("Interseção sets 1 e 4:", intersectionSet.toString());
  
  let differenceSet = set3.difference(set4);
  console.log("Diferença sets 3 e 4:", differenceSet.toString());
  
}
  
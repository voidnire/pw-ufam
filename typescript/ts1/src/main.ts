// Seleciona os elementos do DOM
const raioInput = document.getElementById("raio") as HTMLInputElement;
const calcularBtn = document.getElementById("calcular") as HTMLButtonElement;
const areaSpan = document.getElementById("area") as HTMLSpanElement;
const circunferenciaSpan = document.getElementById(
  "circunferencia"
) as HTMLSpanElement;

// Função para calcular área e circunferência
function calcularCirculo() {
  const raio = parseFloat(raioInput.value);

  if (isNaN(raio)) {
    alert("Por favor, insira um número válido para o raio");
    return;
  }

  if (raio < 0) {
    alert("O raio não pode ser negativo");
    return;
  }

  // Calcula área (πr²)
  const area = Math.PI * Math.pow(raio, 2);
  // Calcula circunferência (2πr)
  const circunferencia = 2 * Math.PI * raio;

  // Exibe os resultados com 2 casas decimais
  areaSpan.textContent = area.toFixed(2);
  circunferenciaSpan.textContent = circunferencia.toFixed(2);
}

// Adiciona o event listener ao botão
calcularBtn.addEventListener("click", calcularCirculo);

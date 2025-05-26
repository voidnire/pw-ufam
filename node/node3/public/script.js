document.getElementById("generateBtn").addEventListener("click", () => {
  const count = document.getElementById("count").value;
  fetch(`/generate?count=${count}`)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("result").innerHTML = html;
    })
    .catch(() => {
      document.getElementById("result").textContent =
        "Erro ao gerar os parágrafos.";
    });
});

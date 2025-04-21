// Criando a tabela de multiplicação com JavaScript
function gerarTabela() {
    const body = document.body; // Elemento body onde a tabela será inserida


    for(let i = 1; i <= 10; i++){
        var tabela = document.createElement("table");
        var cabecalho = document.createElement("thead");
        var corpo = document.createElement("tbody");


        var trCabecalho = document.createElement("tr");
        var th = document.createElement("th");
        th.textContent = `Produto de ${i}`;
        trCabecalho.appendChild(th);
        cabecalho.appendChild(trCabecalho);
        tabela.appendChild(cabecalho); // Adiciona o cabeçalho à tabela

        for (let j = 1; j <= 10; j++) {
            var tr = document.createElement("tr"); // Cria a linha para os produtos
            var td = document.createElement('td'); // Cria a célula
            td.textContent = `${i} x ${j} = ${i * j}`; // Preenche com o produto
            tr.appendChild(td); // Adiciona a célula à linha
            corpo.appendChild(tr); // Adiciona a linha ao corpo da tabela
        }

        tabela.appendChild(corpo); // Adiciona o corpo à tabela
        body.appendChild(tabela);

    }

    /*for (let i = 1; i <= 10; i++) {
        const tr = document.createElement('tr'); // Cria uma nova linha para cada número de 1 a 10

        for (let j = 1; j <= 10; j++) {
            const td = document.createElement('td'); // Cria uma célula
            td.textContent = `${i}x${j} = ${i * j}`; // Preenche com o produto
            tr.appendChild(td); // Adiciona a célula à linha
        }

        tabela.appendChild(tr); // Adiciona a linha à tabela
    }*/

}

// Chama a função para gerar a tabela assim que a página for carregada
gerarTabela();
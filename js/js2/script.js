
function inicio() {
    let titulo = document.createElement("h1");
    titulo.textContent = "Oieeee (●'◡'●)!";  
    document.body.appendChild(titulo);
    }
    inicio();

    function jogarJokenpo() {
        
        let pontuacao = 0;
        let jogadas = ["Papel", "Pedra", "Tesoura"]; 

        // escolha do computador
        function escolhaComputador() {
            return Math.floor(Math.random() * 3); 
        }

        // verificar o vencedor
        function verificarVencedor(jogador, computador) {
            if (jogador === computador) {
                return "A rodada empatou!";
            } else if ((jogador === 0 && computador === 1) || (jogador === 1 && computador === 2) || (jogador === 2 && computador === 0)) {
                return "Você ganhou!";
            } else {
                return "Você perdeu!";
            }
        }

        function escolha() {
            return console.log("Escolha sua jogada:\n1 - Papel\n2 - Pedra\n3 - Tesoura");
        }

        //INICIO
        escolha();
            
        //JOGADAS
        do {
            let escolhaJogador = parseInt(prompt());
            
            if (escolhaJogador < 1 || escolhaJogador > 3 || isNaN(escolhaJogador)) {
                console.log("Jogada inválida! Você perdeu.");
                console.log("Sua pontuação final foi: " + pontuacao);
                break; // se perde
            }

            //ajuste de indice
            escolhaJogador -= 1;

            let escolhaDoComputador = escolhaComputador();
            console.log(`Você escolheu: ${jogadas[escolhaJogador]}`);
            console.log(`O computador escolheu: ${jogadas[escolhaDoComputador]}`);

            //verifica
            let resultado = verificarVencedor(escolhaJogador, escolhaDoComputador);
            console.log(resultado);


            if (resultado ===  "Você perdeu!") {
                console.log("Sua pontuação final foi: " + pontuacao);
                break; //se perde
            }
            else if  (resultado ===  "Você ganhou!"){
                pontuacao++;
            }
            escolha();
        }while (true);
    }
    
    //INICIALIZAÇÃO DA PÁGINA
    
    jogarJokenpo();

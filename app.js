let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumAleatorio();
let tentativas = 1;

function exibirTextoTela(tag, texto) {
    let titulo = document.querySelector(tag);
    titulo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} );
}

function exibirMensagemInicial() {
    exibirTextoTela("h1", "Jogo do número secreto");
    exibirTextoTela("p", "Escolha um número entre 1 e 10");
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector("input").value;
    
    if (chute == numeroSecreto) {
        exibirTextoTela("h1", "Acertou!");

        let palavraTentativa = tentativas > 1 ? `com: ${tentativas} tentativas` : "de primeira";
        let mensagemTentativas = `Você descobriu o número secreto ${palavraTentativa}!`;

        exibirTextoTela("p", mensagemTentativas)

        document.getElementById("reiniciar").removeAttribute("disabled");
    }
    else {
        if (chute > numeroSecreto) {
            exibirTextoTela("p", `O número secreto é menor que ${chute}`);
        }
        else {
            exibirTextoTela("p", `O número secreto é maior que ${chute}`);
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);

    if (listaDeNumerosSorteados.length == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumAleatorio();
    }
    else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo() {
    numeroSecreto = gerarNumAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}
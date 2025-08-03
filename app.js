let listaDenumerosSorteados = [];
let numeroMaximo = 100;

function gerarNumeroOleatorio(){
  let numero = parseInt( Math.random() * numeroMaximo + 1);
  let quantidadeNumerosNaLista = listaDenumerosSorteados.length;

  if(quantidadeNumerosNaLista === numeroMaximo){
    listaDenumerosSorteados = [];
    exibirTextoNaTexto("h1", "Fim de Jogo!")
    exibirTextoNaTexto("p", `Você já tentou todos os números possíveis de 1 a ${numeroMaximo}. Reinicie o jogo!`)
    document.getElementById("reiniciar").removeAttribute("disabled");
  }

  if(listaDenumerosSorteados.includes(numero)){
      return   gerarNumeroOleatorio();
    } else {
      listaDenumerosSorteados.push(numero);
      console.log(listaDenumerosSorteados);
      
        return numero;
    }

}
let numeroSecreto = gerarNumeroOleatorio();
console.log(numeroSecreto);

let tentativas = 0;

const exibirTextoNaTexto = (tag, texto) => {
  let campo =  document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, "Brazilian Portuguese Female", {
    rate: 1.2
  });
}

const exibirTextoInicial = () => {
    exibirTextoNaTexto("h1", "Jogo do Número Secreto!")
    exibirTextoNaTexto("p", "Escolha um número entre 1 e 100")
    }

exibirTextoInicial();

const verificarChute = () =>{
  tentativas ++;
  let chute =  document.querySelector("input").value;
  const mensagemTentativas =  ` em ${tentativas == 1 ? `${tentativas} tentativa` : `${tentativas} tentativas` }`;
  
  if(chute == numeroSecreto){
    exibirTextoNaTexto("h1", "Acertou!")
    exibirTextoNaTexto("p", `Você descobriu o número secreto ${mensagemTentativas}!`)
    document.getElementById("reiniciar").removeAttribute("disabled");
    
}else {
    exibirTextoNaTexto("h1", "Tente Novamente!")
    exibirTextoNaTexto("p", `Dica: O número é ${numeroSecreto > chute ? "maior" : "menor"} que ${chute}`)
}

if (chute != numeroSecreto){
    limparCampo();
}else{
    document.querySelector("input").disabled = true;
    document.getElementById("chute").disabled = true

  }
}

const limparCampo = () => {
  let chute =  document.querySelector("input");
  chute.value = "";
}

const reiniciarJogo = () => {
  numeroSecreto = gerarNumeroOleatorio();
  tentativas = 0;
  document.querySelector("input").disabled = false;
  document.getElementById("chute").disabled = false;
  document.getElementById("reiniciar").setAttribute("disabled", "true");
  exibirTextoInicial();
  limparCampo();
  console.log(numeroSecreto);
}
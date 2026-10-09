// Configuração de personagem
class rpg {
constructor(){
let jogador 
}
// iniciar jogo
iniciar() {
console.log("Bem-vindo ao jogo")
let comecar = parseInt(prompt("Deseja começar a jogar? \n[1] Sim\n[2] Não"))
if(comecar === 1) 
{
this.criarPersonagem()
console.clear()

// loop do jogo
while(this.jogador.vida > 0)
{
  this.jogador.exibirMenu()
}
}
else { 
    console.log("Você saiu")
}
}




// criaçao do personagem
criarPersonagem()
{ let nome = prompt("Digite o nome do seu personagem para iniciar")
    this.jogador = new Personagem(nome)
}


}












class Personagem {
    constructor(nome) {
      this.vida = 100;
      this.defesa = 0.75;
      this.ataque = 20;
      this.nome = nome;
      this.experiencia = 0;
      this.nivel = 1; 
      this.pontos = 0;
      this.inventario = ["Poção de Cura"];
    }
  
    exibirMenu() {
      console.log("[1] Ataque básico \n[2] Acessar inventário");
    }
  
    usarInventario() {
      console.log(this.inventario);
      let n = parseInt(prompt("Digite o número do item que deseja usar:"));
  
      if (n >= 0 && n < this.inventario.length) {
        let itemUsado = this.inventario[n];
  
        // série de ifs que irá ver qual item foi usado
  
        this.inventario.splice(n, 1);
      } else {
        console.log("Item inválido!");
      }
    }
  
    receberDano(dano) {
      this.vida -= dano;
      console.log(`${this.nome} recebeu ${dano} de dano.\nVida restante: ${this.vida}`);
    }
  
    subirNivel() {
      while (this.experiencia >= 100) {
        this.experiencia -= 100;
        this.nivel += 1;
        this.pontos += 2;
        console.log(`${this.nome} subiu para o nível ${this.nivel} e recebeu 2 pontos!\nPontos disponíveis: ${this.pontos}`);
      }
    }
  
    controleStatus() {
      let decisao = "s";
  
     //loop para upar  
  
  
      while (decisao === "s" && this.pontos > 0) {
        let upar = parseInt(prompt(`Você tem ${this.pontos} pontos disponíveis.\n[1] Força (+3 Ataque)\n[2] Defesa (+0.05 Defesa)\n[3] Saúde (+5 Vida)\nDigite a opção desejada:`));
  
        if (upar === 1) {
          this.ataque += 3;
          this.pontos--;
          console.log(`Ataque aumentado para: ${this.ataque}`);
        } else if (upar === 2) {
          this.defesa += 0.05;
          this.pontos--;
          console.log(`Defesa aumentada para: ${this.defesa}`);
        } else if (upar === 3) {
          this.vida += 5;
          this.pontos--;
          console.log(`Vida aumentada para: ${this.vida}`);
        } else {
          console.log("Opção inválida!");
        }
  
        
        if (this.pontos > 0) {
          decisao = prompt("Deseja evoluir mais algum atributo? ('s' ou 'n')").toLowerCase();
        } else {
          console.log("Você gastou todos os seus pontos de atributos!");
        }
      }
    }
  }
  

// aqui o jogo roda
  jogo = new rpg()
  jogo.iniciar()


  git config --global user.email "raphaoliveira415@gmail.com"
  git config --global user.name "Raphael-oliveira333"
// Configuração de personagem
class rpg {
constructor(){
this.jogador ;
this.monstro;
this.fase = 1
this.derrotados = 0;
this.contador = 0;

}
// iniciar jogo
iniciar() {
console.log("Bem-vindo ao jogo")
let comecar = parseInt(prompt("Deseja começar a jogar? \n[1] Sim\n[2] Não"))
if(comecar === 1) 
{
this.criarPersonagem()
// fase 1
this.fase1()
//........
if(this.jogador.vida > 0)
{
// resto do jogo 



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

// monstro

gerarMonstro() {
let nomes = ["Goblin","Anão","Ogro"]
let i = Math.floor(Math.random()*nomes.length)
let nome = nomes[i]
this.monstro = new Monstro(nome)
if(this.monstro.nome == "Goblin")
{
this.monstro.vida -= 20
}
if(this.monstro.nome == "Anão")
{
  this.monstro.vida += 20
  this.monstro.ataque -= 3
}
if(this.monstro.nome == "Ogro")
{
  this.monstro.vida += 10
  this.monstro.ataque += 3
  this.monstro.experiencia += 30
}
}

// fases
fase1(){
  while(this.fase == 1 && this.jogador.vida > 0 ) 
  { 
    this.gerarMonstro()
  
    console.log(`Um ${this.monstro.nome} aparece derrepente`)
  
  
  while(this.jogador.vida > 0 && this.monstro.vida > 0)
  {
  
    console.log("Sua vez")
    this.jogador.exibirMenu() 
    let desicao = parseInt(prompt("digite a opção desejada"))
    if(desicao === 1){
      this.monstro.receberDano(this.jogador.ataque)
    }
  if(desicao === 2){
    console.clear()
  this.jogador.usarInventario()
  }

  if(this.monstro.vida > 0){
    console.log("\n\n")
  console.log(`Vez do ${this.monstro.nome}`)
  this.jogador.receberDano(this.monstro.ataque)
  }
  
  
  
  }
  this.derrotados ++
  if(this.derrotados >= 100)
  {
    this.jogador.conquistas.push("Falta do que fazer")
    console.log(`${this.jogador.nome} devastou vilas de Goblins inteiras. Realmente ele não tinha nada melhor para fazer`)
  }
  this.contador ++
  if(this.jogador.vida > 0) {
    console.clear()
    let chance = Math.trunc(Math.random()*10)
    if(chance >= 5)
    {
      let drop = Math.trunc(Math.random()*this.monstro.drop.length)
      this.jogador.inventario.push(this.monstro.drop[drop])
      console.log(`O ${this.monstro.nome} soltou uma ${this.monstro.drop[drop]}`)
    }
  this.jogador.experiencia += this.monstro.experiencia
  this.jogador.subirNivel()
  if(this.jogador.pontos > 0){
    let upar = parseInt(prompt("Deseja melhorar seus status? \n[1] Sim\n[2]Não"))
    if(upar == 1)
    {
      this.jogador.controleStatus()
    }
  }
  if(this.contador == 10){
    console.log(`${this.jogador.nome} venceu o primeiro nivel \nDeseja repetir o nivel? (recomendado)\n[1] Sim \n[2] Não`)
    let decisao = prompt("Digite a opção desejada")
    if(decisao == 1){
      this.contador == 0 
    }
    else{
      console.log(`${this.jogador.nome} decide avançar em busca de seus objetivos`)
      this.fase ++
    }
  }
  
  }
  else{
    console.log(`${this.jogador.nome} foi derrotado`)
    // mostrar conquistas
  }
  
  }
  }

}










class Monstro {
 constructor(nome){
  this.vida = 100;
  this.ataque = 5;
  this.nome = nome;
  this.experiencia = 50
  this.drop = ["Poção de Cura", "Maçã Doce", "Poção de Força"]

 }
 receberDano(dano) {
  this.vida -= dano;
  console.log(`O ${this.nome} recebeu ${dano} de dano.\nVida restante: ${this.vida}`);
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
      this.saude = 0;
      this.inventario = ["Poção de Cura"];
      this.conquistas = [];
    }
  
    exibirMenu() {
      console.log("[1] Ataque básico \n[2] Acessar inventário");
    }
  
    usarInventario() {
      console.log(this.inventario);
      let n = parseInt(prompt("Digite o número do item que deseja usar:"));
  
      if ((n - 1) >= 0 && (n - 1) < this.inventario.length) {
        let itemUsado = this.inventario[n - 1];
  
        // série de ifs que irá ver qual item foi usado
         if(itemUsado == "Poção de Cura"){
          console.log(`${this.nome} usou ${itemUsado}`)
          console.log(`Vida : ${this.vida} + 20`)
          this.vida += 20
         }
        if(itemUsado == "Maçã Doce")
        {
          console.log(`${this.nome} usou ${itemUsado}`)
          console.log(`Vida : ${this.vida} + 30`)
          this.vida += 30
        }
        if(itemUsado == "Poção de Força")
          {
            console.log(`${this.nome} usou ${itemUsado}`)
            console.log(`Ataque : ${this.ataque} + 3`)
            this.ataque += 3
          }



        // ............................................
  
        this.inventario.splice((n-1), 1);
      } else {
        console.log("Item inválido!");
      }
    }
  
    receberDano(dano) {
      this.vida -= dano;
      console.log(`${this.nome} recebeu ${dano} de dano.\nVida restante: ${this.vida}`);
    }
  
    subirNivel() {
      
      let balanceamento = (((this.nivel)/10 ) * 100) + 100
      while (this.experiencia >= balanceamento) {
        this.vida = 100 + this.saude
        this.experiencia -= balanceamento;
        this.nivel += 1;
        this.pontos += 2;
        console.log(`${this.nome} subiu para o nível ${this.nivel} e recebeu 2 pontos!\nPontos disponíveis: ${this.pontos}`);
      }
    }
  
    controleStatus() {
      let decisao = 1;
  
     //loop para upar  
  
  
      while (decisao == 1 && this.pontos > 0) {
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
          this.saude += 5
          this.vida += 5;
          this.pontos--;
          console.log(`Vida aumentada para: ${this.vida}`);
        } else {
          console.log("Opção inválida!");
        }
  
        
        if (this.pontos > 0) {
          decisao = parseInt(prompt("Deseja evoluir mais algum atributo? \n[1] Sim\n[2] Não"));
        } else {
          console.log("Você gastou todos os seus pontos de atributos!");
        }
      }
    }
  }
  

// aqui o jogo roda
  jogo = new rpg()
  jogo.iniciar()


  //git config --global user.email "raphaoliveira415@gmail.com"
  //git config --global user.name "Raphael-oliveira333"
// Configuração de personagem
class rpg {
constructor(){
this.jogador ;
this.monstro;
this.fase = 1
this.derrotados = 0;
this.contador = 0;
this.skillsJogo = [{nome : "Bola de Fogo" , dano : 40 , cura : 0 , custo : 100, execucao(){console.log("Uma bola de fogo é invocada")}},
  {nome : "Magia de Cura" , dano : 0, cura : 60 , custo : 150, execucao(){console.log(`${this.jogador.nome} reestabelece suas forças\n + 60 de vida`)}}

];

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
this.faseChefe()



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
    this.jogador.skills.push(this.skillsJogo[0])
  
}

usoSkills(skils){
console.log(`[1] : ${skils[0].nome}\n`)
if(this.jogador.skills.length >= 2)
{
  console.log(`[2] : ${skils[1].nome}\n`)
}
if(this.jogador.skills.length >= 2)
  {
    console.log(`[3] : ${skils[2].nome}\n`)
  }


let skill = parseInt(prompt("Qual deseja usar?"))
if(this.jogador.mana >= skils[skill - 1].custo){
  skils[skill - 1].execucao()
  this.monstro.receberDano(skils[skill - 1].dano)
  this.jogador.mana -= skils[skill - 1].custo
}
else{
  console.log(`${this.jogador.nome} não possui mana suficiente`)
}


}

// monstro

gerarMonstro() {
  let balanceamento = 3 * this.jogador.nivel
let nomes = ["Goblin","Anão","Ogro"]
let i = Math.floor(Math.random()*nomes.length)
let nome = nomes[i]
this.monstro = new Monstro(nome)
if(this.monstro.nome == "Goblin")
{
this.monstro.vida += -20 + balanceamento
this.monstro.moedas = 5
}
if(this.monstro.nome == "Anão")
{
  this.monstro.vida += 20 + balanceamento
  this.monstro.ataque += -3 + balanceamento
  this.monstro.moedas = 6
}
if(this.monstro.nome == "Ogro")
{
  this.monstro.vida += 10 + balanceamento
  this.monstro.ataque += 3 + balanceamento
  this.monstro.experiencia += 30
  this.monstro.moedas = 9
}
if(this.contador %5 == 0 && this.contador != 0){
  this.monstro.vida +=  + 10
  this.monstro.ataque +=  + 10
}
}

// fases
fase1(){
  while(this.fase == 1 && this.jogador.vida > 0 ) 
  { 
    if(this.jogador.nivel == 5 && this.jogador.skills.length == 1){
      this.jogador.skills.push(this.skillsJogo[1])
      console.log(`${this.jogador.nome} aprendeu uma nova skill: ${this.skillsJogo[1].nome}`)
    }
    this.gerarMonstro()
  if(this.contador%5 == 0 && this.contador != 0){
    console.log(`Um ${this.monstro.nome} mais forte aparece`)
  }else{
    console.log(`Um ${this.monstro.nome} aparece derrepente`)
  }
  
  while(this.jogador.vida > 0 && this.monstro.vida > 0)
  {

    console.log(`Turno de ${this.jogador.nome}`)
    this.jogador.exibirMenu() 
    let decisao = parseInt(prompt("digite a opção desejada"))
    if(decisao === 1){
      this.monstro.receberDano(this.jogador.ataque)
    }
  if(decisao === 2){
    console.clear()
  this.jogador.usarInventario()
  }
  if(decisao == 3){
    this.jogador.loja()
  }
  if(decisao == 4){
    this.usoSkills(this.jogador.skills)
  }

  if(this.monstro.vida > 0 && decisao != 2 && decisao != 3){
  console.log(`----------Vez do ${this.monstro.nome}----------`)
  this.jogador.receberDano(this.monstro.ataque)
  }
  if(this.jogador.mana < 100 + this.jogador.tetoMana)
  {
  this.jogador.mana += 20
  }
  
  }
  this.derrotados ++
  this.jogador.moedas += this.monstro.moedas
  
  

  this.contador ++
  if(this.jogador.vida > 0) {
    console.clear()
    console.log(`O ${this.monstro.nome} soltou ${this.monstro.moedas} moedas`)
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
    console.log(`${this.jogador.nome} encontrou o ninho do Dragão.\nDeseja dar meia volta e se preparar mais? (recomendado)\n[1] Sim \n[2] Não`)
    let decisao = prompt("Digite a opção desejada")
    if(decisao == 1){
      this.contador = 0 
    }
    else{
      console.log(`${this.jogador.nome} entra no ninho`)
      this.fase ++
    }
  }
  
  }
  else{
    console.log(`${this.jogador.nome} foi derrotado`)
    
  }
  
  }
  }

  faseChefe(){
this.monstro = new Monstro("Dragão")
this.monstro.vida += 500
this.monstro.ataque += 30
console.log("O Dragão se levanta, abrindo suas asas\nÉ o momento de atacar")


while(this.jogador.vida > 0 && this.monstro.vida > 0){

let invocar = Math.trunc((Math.random()*10))
if(invocar >= 7){

  
let Invocado = new Monstro("Servo")
console.log("O Dragão invoca um de seus Servos")
while(this.jogador.vida > 0 && Invocado.vida > 0)
{

  console.log("Sua vez")
  this.jogador.exibirMenu() 
  let decisao = parseInt(prompt("digite a opção desejada"))
  if(decisao === 1){
    Invocado.receberDano(this.jogador.ataque)
  }
if(decisao === 2){
  console.clear()
this.jogador.usarInventario()
}
if(decisao == 3){
  this.jogador.loja()
}
if(decisao == 4){
  this.usoSkils(this.jogador.skils)
}

if(Invocado.vida > 0 && decisao != 2 && decisao != 3){
console.log(`----------Vez do ${Invocado.nome}----------`)
this.jogador.receberDano(Invocado.ataque)
}
this.jogador.mana += 20
this.jogador.moedas += 9
if(Invocado.vida <0) {
  console.log("O servo foi derrotado")
}

}


}


  console.log("Sua vez")
  this.jogador.exibirMenu() 
  let decisao = parseInt(prompt("digite a opção desejada"))
  if(decisao === 1){
    this.monstro.receberDano(this.jogador.ataque)
  }
if(decisao === 2){
  console.clear()
this.jogador.usarInventario()
}
if(decisao == 3){
  this.jogador.loja()
}
if(decisao == 4){
  this.usoSkils(this.jogador.skils)
}

if(this.monstro.vida > 0 && decisao != 2 && decisao != 3){
console.log(`----------Vez do ${this.monstro.nome}----------`)
this.jogador.receberDano(this.monstro.ataque)
}
this.jogador.mana += 20


}


  }
}











class Monstro {
 constructor(nome){
  this.moedas = 0;
  this.vida = 100;
  this.ataque = 5;
  this.nome = nome;
  this.experiencia = 50 ;
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
      this.mana = 100;
      this.ataque = 20;
      this.nome = nome;
      this.experiencia = 0;
      this.nivel = 1; 
      this.pontos = 0;
      this.saude = 0;
      this.tetoMana = 0;
      this.inventario = ["Poção de Cura"];
      this.conquistas = [];
      this.skills = [];
      this.moedas = 0;
    }
  
    exibirMenu() {
      console.log(`Vida : ${this.vida}\nMana : ${this.mana}\nMoedas : ${this.moedas}\n------------------\n[1] Ataque básico \n[2] Acessar inventário\n[3] Acessar loja\n[4] Usar habilidades`);
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
if(itemUsado == "Frasco de Mana")
{
  console.log(`${this.nome} usou ${itemUsado}`)
            console.log(`Mana : ${this.ataque} + 70`)
            this.mana+= 70
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
        this.mana = 100 + this.tetoMana
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
        let upar = parseInt(prompt(`Você tem ${this.pontos} pontos disponíveis.\n[1] Força (+3 Ataque)\n[2] Mana (+3 Mana)\n[3] Saúde (+5 Vida)\nDigite a opção desejada:`));
  
        if (upar === 1) {
          this.ataque += 3;
          this.pontos--;
          console.log(`Ataque aumentado para: ${this.ataque}`);
        } else if (upar === 2) {
          this.tetoMana += 3
          this.mana += 3;
          this.pontos--;
          console.log(`Mana aumentada para: ${this.mana}`);
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
    loja() {
      
     let ItensPossiveis = ["Poção de Cura" , "Poção de Força", "Maçã Doce", "Frasco de Mana"]
     let itensVenda = []
     for(let i = 0; i < 3; i ++){
      itensVenda.push(ItensPossiveis[Math.trunc((Math.random()*ItensPossiveis.length))])
     }
     console.log(`Bem-vindo a loja, aventureiro \nO que deseja?\n\n[1] : ${itensVenda[0]} 20 moedas\n[2] : ${itensVenda[1]} 20 moedas\n[3] : ${itensVenda[2]} 20 moedas\n[4] sair`)
     let decisao = parseInt(prompt(` Vocẽ possui ${this.moedas} moedas \nDigite a opçao`))
if(this.moedas >= 20 && (decisao >= 1 && decisao <= 3)){
  

if(decisao == 1){
  console.log(`${this.nome} comprou ${itensVenda[0]}`)
this.moedas -= 20
this.inventario.push(itensVenda[0])
}
if(decisao == 2){
  console.log(`${this.nome} comprou ${itensVenda[1]}`)
this.moedas -= 20
this.inventario.push(itensVenda[1])
}
if(decisao == 3){
  console.log(`${this.nome} comprou ${itensVenda[2]}`)
this.moedas -= 20
this.inventario.push(itensVenda[2])
}
if(decisao == 4){
  console.log(" Sem dinheiro ?")
}
    }
    else{ console.log('Vocẽ não possui dinheiro suficiente')}
  }
  }
  

// aqui o jogo roda
  jogo = new rpg()
  jogo.iniciar()


  //git config --global user.email "raphaoliveira415@gmail.com"
 // git config --global user.name "Raphael-oliveira333"
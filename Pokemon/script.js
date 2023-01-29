var attackButton = document.querySelector("#BATK");
var pokemonButton = document.querySelector("#BPOK");
var pokemonAttack = document.getElementById('poATK')

let checkA = false;
let checkP = false;

class Type {
    constructor(index, nom) {
        this.Index = index;
        this.Name = nom;
    }
}

class Attaque {
    constructor(nom, deg, type) {
        this.Name = nom;
        this.Degats = deg;
        this.Type = type;
    }
}

class Pokemon {
    constructor(nom, pdv, type, img) {
        this.Name = nom;
        this.LifeP = pdv;
        this.Type = type;
        this.Attaques = [];
        this.img = img;
    }

    attaque(attaque, poke) {
        poke.LifeP -= attaque.Degats;
    }

    affichage() {
        console.log("Nom : ", this.Name, ",", "Points de vie : ", this.LifeP, ",", "Type : ", this.Type.Name)
        console.log("Attaques :")
        for (let element in this.Attaques) {
            console.log(parseInt(element) + 1, this.Attaques[element].Name, ",", "Dégats : ", this.Attaques[element].Degats, ",", "Type : ", this.Attaques[element].Type.Name)
        }
    }
}

let typeFeu = new Type(0, 'Feu');
let typeEau = new Type(1, 'Eau');

let poke1 = new Pokemon('Dracofeu', 200, typeFeu, "./img/draco.png");
let poke2 = new Pokemon('Tortank', 200, typeEau, "./img/tortank.png");

let pokeF = new Pokemon('Arceus', 500, typeEau, "./img/draco.png");

let pokeArray = [poke1, poke2]

let attaque1 = new Attaque('Double-canon', 50, typeEau);
let attaque2 = new Attaque('Danse Flammes', 45, typeFeu);
let attaque3 = new Attaque("Feu d'Enfer", 70, typeFeu);
let attaque4 = new Attaque('Boutefeu', 100, typeFeu);

poke2.Attaques.push(attaque1);
poke1.Attaques.push(attaque2);
poke1.Attaques.push(attaque3);
poke1.Attaques.push(attaque4);

console.log("test-------------------------");

/*Prompt usage*/
/*
const prompt=require("prompt-sync")({sigint:true}); 
*/
/* npm install prompt-sync -> install prompt*/


/*Tour*/
/*attaque*/
function tourAttaque(pokemon) {
    console.log("=======================================");
    pokemon.affichage();
    console.log("=======================================");
    let numAttaque = prompt("Choisir le numéro de votre attaque : ")
    console.log("Vous avez choisi l'attaque numéro ", numAttaque);
    console.log();
    console.log("Vous infligez ", pokemon.Attaques[numAttaque - 1].Degats, "points de dégats");
    pokemon.attaque(pokemon.Attaques[numAttaque - 1], pokeF);
    console.log("Il reste ", pokeF.LifeP, "points de vie à", pokeF.Name);
    console.log();
}
/*pokemon*/
function testWOW(i) {
    tempPokemon = i;
    for (let i = 0; i < pokeArray.length; i++) {
        var temporaryButton = document.getElementById("pok" + (i + 1));
        temporaryButton.remove();
    }
    refreshHP();
    pokemonAttack.setAttribute('src', pokeArray[i].img);
    checkP = false;
}

function refreshHP() {
    var allyHP = document.getElementById('hp-ally');
    allyHP.innerHTML = "hp : " + pokeArray[tempPokemon].LifeP;
    var ennemyHP = document.getElementById('hp-ennemy');
    ennemyHP.innerHTML = "hp : " + pokeF.LifeP;
    allyHP.style.color = 'blue';
    ennemyHP.style.color = 'red';

}

function tourPokemon() {
    let i = 0;
    for (let element in pokeArray) {
        i = i + 1;
        let counterPok = "pok" + i;
        let functionPok = "testWOW(" + (i - 1) + ")";
        let attackName = parseInt(element) + 1;
        attackName.toString;
        let attackName2 = pokeArray[element].Name;
        attackName2.toString;
        attackName = attackName + attackName2
        attackButton.insertAdjacentHTML("beforebegin", '<button onclick = "" id="test5" class="unseeButton"></button>');
        var tempButtonPok = document.querySelector('#test5')
        tempButtonPok.innerHTML = attackName;
        tempButtonPok.setAttribute('id', counterPok);
        tempButtonPok.setAttribute('onclick', functionPok);
    }
    
}


/* new code */
/* attack*/
attackButton.addEventListener('click', (event) => {
    if (checkA == false && checkP == false) {
        attackButton.insertAdjacentHTML("afterend", '<button id="test" class="unseeButton">Attaque 1</button>');
        attackButton.insertAdjacentHTML("afterend", '<button id="test2" class="unseeButton">Attaque 2</button>');
        attackButton.insertAdjacentHTML("afterend", '<button id="test3" class="unseeButton">Attaque 3</button>');
        attackButton.insertAdjacentHTML("afterend", '<button id="test4" class="unseeButton">Attaque 4</button>');
        checkA = true;
    }
});

/*pokemon*/
pokemonButton.addEventListener('click', (event) => {
    console.log(checkP)
    if (checkP == false) {
        if (checkA == true) {
            const tempButton = document.querySelector("#test");
            const tempButton2 = document.querySelector("#test2");
            const tempButton3 = document.querySelector("#test3");
            const tempButton4 = document.querySelector("#test4");
            tempButton.remove();
            tempButton2.remove();
            tempButton3.remove();
            tempButton4.remove();
        }
        tourPokemon();
        checkA = false;
        checkP = true;
    }
});

let tempPokemon;



/* Match*/
/*

tourAttaque(pokeArray[tempPokemon]);
while (pokeArray.length>0 && pokeF.LifeP > 0){
   let tourChoice = prompt("1 Attaque, 2 Choix pokemon");
   if (tourChoice == "1"){
    tourAttaque(pokeArray[tempPokemon]);
   }
   else if (tourChoice == "2"){
    tempPokemon = tourPokemon();
   }
}
*/


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

var allyHP = document.getElementById('hp-ally');
var ennemyHP = document.getElementById('hp-ennemy');

var attackButton = document.querySelector("#BATK");
var pokemonButton = document.querySelector("#BPOK");
var pokemonAttack = document.getElementById('poATK')

let checkA = false;
let checkP = false;

let tempPokemon;

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

let attaqueF = new Attaque('Charge Trinité', 40, typeFeu);

poke2.Attaques.push(attaque1);
poke1.Attaques.push(attaque2);
poke1.Attaques.push(attaque3);
poke1.Attaques.push(attaque4);

pokeF.Attaques.push(attaqueF);

console.log("test-------------------------");

/*Prompt usage*/
/*
const prompt=require("prompt-sync")({sigint:true}); 
*/
/* npm install prompt-sync -> install prompt*/


/*Tour*/
/*attaque*/
function tourAttaque(numATK) {
    pokeArray[tempPokemon].attaque(pokeArray[tempPokemon].Attaques[numATK], pokeF);
    for (let i = 0; i < pokeArray[tempPokemon].Attaques.length; i++) {
        var tempButton = document.getElementById("atk" + (i + 1));
        tempButton.remove();
    }
    tourAdverse();
    refreshHP();
    checkA = false;
}
/*pokemon*/
function chooseComplete(i) {
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
    allyHP.innerHTML = "hp : " + pokeArray[tempPokemon].LifeP;
    ennemyHP.innerHTML = "hp : " + pokeF.LifeP;
    allyHP.style.color = 'blue';
    ennemyHP.style.color = 'red';
    if ((pokeArray[tempPokemon].LifeP <= 0)){
        allyHP.innerHTML = "Vous avez perdu !";
        ennemyHP.innerHTML = "Gagnant";
        allyHP.style.color = 'black';
        ennemyHP.style.color = 'yellow';
    }
    else if (pokeF.LifeP <= 0){
        allyHP.innerHTML = "Vous avez gagné !";
        ennemyHP.innerHTML = "MORT";
        allyHP.style.color = 'yellow';
        ennemyHP.style.color = 'black';
    };

}

function tourPokemon() {
    let i = 0;
    for (let element in pokeArray) {
        i = i + 1;
        let counterPok = "pok" + i;
        let functionPok = "chooseComplete(" + (i - 1) + ")";
        let attackName = parseInt(element) + 1;
        attackName.toString;
        let attackName2 = pokeArray[element].Name;
        attackName2.toString;
        attackName = attackName + attackName2
        attackButton.insertAdjacentHTML("beforebegin", '<button onclick = "" id="pokechoose" class="unseeButton"></button>');
        var tempButtonPok = document.querySelector('#pokechoose')
        tempButtonPok.innerHTML = attackName;
        tempButtonPok.setAttribute('id', counterPok);
        tempButtonPok.setAttribute('onclick', functionPok);
    }

}

function tourAdverse() {
    if (pokeF.LifeP > 0) {
        pokeF.attaque(pokeF.Attaques[getRandomInt(pokeF.Attaques.length)], pokeArray[tempPokemon]);
    }

}


/* new code */
/* attack*/
attackButton.addEventListener('click', (event) => {
    if (checkA == false && checkP == false) {
        for (let i = 0; i < pokeArray[tempPokemon].Attaques.length; i++) {
            let attackName = (i + 1) + " Nom : " + pokeArray[tempPokemon].Attaques[i].Name + " Dégats : " + pokeArray[tempPokemon].Attaques[i].Degats + " Type : " + pokeArray[tempPokemon].Attaques[i].Type.Name;
            let counterPok = "atk" + (i + 1);
            let functionPok = "tourAttaque(" + i + ")";
            attackButton.insertAdjacentHTML("afterend", '<button id="pokeattack" class="unseeButton" onclick = "" ></button>');
            var tempButtonPok = document.querySelector('#pokeattack');
            tempButtonPok.innerHTML = attackName;
            tempButtonPok.setAttribute('id', counterPok);
            tempButtonPok.setAttribute('onclick', functionPok);
        }
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

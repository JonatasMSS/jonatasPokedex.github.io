import Pokemon from "./models/pokemon_data.js";


const docListPoke = document.getElementById('poke-list');
const button = document.getElementById('show-more');
let pokemon_container;
let offset = 0;
const limit = 10;
var localPokemons = [];


function pokemonContainerEvent(){
    pokemon_container.forEach((element)=>{
        element.addEventListener('click',()=>{
            //Retorna os elementos pokemon-data
           var title_data = element.getElementsByClassName('title-data').item(0).getElementsByTagName('h4').item(0).innerHTML.substr(1);
           window.location.href = `./pages/pokeDetails.html?${parseInt(title_data,10)}`; // Query send
            
        })

    });
}

function updateOffsetPokemon(offset = 0,limit = 10){
    pokeApi.getPokemons(offset,limit)
    .then((data) => data.map((element) => new Pokemon(element.id,element.name,element.types,element.img)))
    .then((pokemon) => pokemon.forEach((poke) => {
       
        docListPoke.innerHTML += poke.injectToHTML();
    })).then(()=>{
       pokemon_container = document.querySelectorAll('.pokemon-data');
       pokemonContainerEvent();
    });

}
await pokeApi.getPokemons(0,10)
.then((data) => data.map((element) => new Pokemon(element.id,element.name,element.types,element.img)))
.then((pokemon) => pokemon.forEach((poke) => {
    localPokemons.push(poke);
    docListPoke.innerHTML += poke.injectToHTML();
})).then(()=>{
    pokemon_container = document.querySelectorAll('.pokemon-data');
    pokemonContainerEvent();


});


//EVENTS
button.addEventListener('click',() => {
    if(offset == 150) {
        button.parentElement.removeChild(button);
    }
    else{
        offset += limit;
    }
    updateOffsetPokemon(offset);

});


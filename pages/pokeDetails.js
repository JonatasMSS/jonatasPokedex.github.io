const POKEMONURL = window.location.search.substring(1); // return url query = 1

let localPageData = {
    'header':document.getElementsByTagName('header')[0],
    'header-img':document.getElementsByClassName('img-header')[0],
    'header-text':document.getElementById('pokemon-headerText'),
    'header-types':{
        'type1':document.getElementById('header-text-container').children[1].children[0],
        'type2':document.getElementById('header-text-container').children[1].children[1],
    },
    'base-stats-about': {
        'height':document.querySelectorAll('.base-stats-data-about')[0],
        'weight':document.querySelectorAll('.base-stats-data-about')[1].children[1],
        'abilities':document.querySelectorAll('.base-stats-data-about')[2].children[1],
    },
    'base-stats-base': document.querySelectorAll('.base-stats-data-base')[0],
    'base-stats-moves':document.querySelectorAll('.base-stats-data-moves')[0],
}//Collect data from this page
pokeApi.getPokemonDetailById(POKEMONURL).then(
    (pokemon) =>{
        

        localPageData.header.setAttribute('class',pokemon['types'][0]); 

        localPageData["header-text"].innerHTML = pokemon['name'];
        //HEADER IMG
        localPageData['header-img'].setAttribute('src',pokemon['img']);
        localPageData['header-img'].setAttribute('class',`img-header ${pokemon['types'][0]}Type`);
        //HEADER TYPES STYLING
        localPageData['header-types'].type1.innerHTML = `<span>${pokemon['types'][0]}</span>`;
        localPageData['header-types'].type2.innerHTML = `<span>${pokemon['types'][1] ?? ''}</span>`;
        localPageData['header-types'].type1.setAttribute('class',`${pokemon['types'][0]}Type`);
        localPageData['header-types'].type2.setAttribute('class',`${pokemon['types'][1] ?? ''}Type`);
        //ABOUT STYLING
        localPageData["base-stats-about"].height.innerHTML += `<span class='blackType'>${pokemon['height']} cm</span>`
        localPageData["base-stats-about"].weight.innerHTML += `<span class='blackType'>${pokemon['weight']} g</span>`
        localPageData["base-stats-about"].abilities.innerHTML += `<span class='blackType'>${pokemon['abilities']}</span>`
        //BASE STATS BASIS
        pokemon['stats'].map((status)=>{
            localPageData['base-stats-base'].innerHTML += `
                <li>
                    <span>${upperCaseFirstLetter(status.status_name)}</span>
                    <span class='blackType'>${status.status}</span>
                </li>
            `
        });

        //MOVES STYLING
        for(var i = 0; i <= 15; i++){
            localPageData["base-stats-moves"].innerHTML += `
                <li>
                    <span class='blackType'>${upperCaseFirstLetter(pokemon['moves'][i])},</span>
                </li> 
            `
        }


    }
);
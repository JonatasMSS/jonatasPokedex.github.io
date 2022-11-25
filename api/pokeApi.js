

const OFFSET = 0;
const LIMIT = 5;
const URL = 'https://pokeapi.co/api/v2/pokemon?offset='+OFFSET+'&limit='+LIMIT;

const pokeApi = {};

pokeApi.getPokemonDetailById = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const jsonBody = await response.json();
    return new Object(
        {
            'id': jsonBody.id,
            'name': upperCaseFirstLetter(jsonBody.name),
            'types': jsonBody.types.map((element) => upperCaseFirstLetter(element.type.name)),
            'img': jsonBody.sprites.front_shiny,
            'height': jsonBody.height,
            'weight': jsonBody.weight,
            'moves': jsonBody.moves.map((element_1) => element_1.move.name),
            'stats': jsonBody.stats.map((element_2) => new Object({ 'status': element_2.base_stat, 'status_name': element_2.stat.name })),
            'abilities': jsonBody.abilities.map((element_3) => element_3.ability.name)
        }
    );

}


pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json());
}


pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(URL)
    .then((reponse) => reponse.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemon) => pokemon.map(pokeApi.getPokemonDetail))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonId) => pokemonId.map((pokeData)=> new Object(
        {
            'id': pokeData.id,
            'name':pokeData.name,
            'types': pokeData.types.map((element) => element.type.name),
            'img':pokeData.sprites.front_shiny

        }
    )))
    

}

// export default pokeApi;
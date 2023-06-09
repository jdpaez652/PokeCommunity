import axios from "axios";

const api_url = 'http://localhost:3000';

export const getPokemonsFromAPI = async () => {
    return axios.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
        .then((res) => res.data.results)
        .catch(error => console.log(error));
}

export const getPokemonDetails = async (url: string) => {
    return axios.get(url)
        .then(res => res.data)
        .catch(err => console.log(err));
}

export const getPokemonsFromDB = async () => {
    return axios.get(`${api_url}/pokemons`)
        .then(res => res.data)
        .catch(err => console.log(err));
}

export const getPokemonById = async (id: number) => {
    return axios.get(`${api_url}/pokemons/${id}`)
        .then(res => res.data)
        .catch(err => console.log(err));
}

export const updatePokemonStatsDB = async (payload: object) => {
    return axios.put(`${api_url}/pokemons/${payload.pokemon_stat_id}/stats`, payload)
        .then(res => res.data)
        .catch(err => console.log(err));
}

export const performSynchronization = async (pokemons: any[]) => {
    const pokemonObjects: {
        pokemon_data: { pokemon_id: number; name: string; types: string; image: string; },
        pokemon_stats: [{ pokemon_id: number, stat_name: string, base_stat: number }];
    }[] = [];

    pokemons.forEach((pokemon) => {
        pokemonObjects.push({
            pokemon_data: {
                pokemon_id: pokemon.id,
                name: pokemon.name,
                types: pokemon.types.map((element: { type: { name: any; }; }) => element.type.name).join(', '),
                image: pokemon.sprites.other['official-artwork'].front_default,
            },
            pokemon_stats: pokemon.stats.map(stat => ({
                pokemon_id: pokemon.id,
                stat_name: stat.stat.name,
                base_stat: stat.base_stat,
            }))
        });
    });

    await Promise.all(
        pokemonObjects.map(async (pokemonObject) => {
            await axios.post(`${api_url}/pokemons`, pokemonObject);
        })
    );
}
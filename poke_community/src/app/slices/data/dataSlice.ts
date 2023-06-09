import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getPokemonById, getPokemonDetails, getPokemonsFromAPI, getPokemonsFromDB, performSynchronization, updatePokemonStatsDB } from "../../api"
import { setIsSynchronizing } from "../ui/uiSlice"

interface dataSlice {
    pokemons: [{
        id: number,
        pokemon_id: number,
        name: string,
        types: string,
        image: string,
        stats: [{
            id: number,
            name: string,
            base_stat:number,
        }]
    }],
    pokemonInModal: [],
}

const initialState: dataSlice = {
    pokemons: [{
        id: 0,
        pokemon_id: 0,
        name: '',
        types: '',
        image: '',
        stats: [{
            id: 0,
            name: '',
            base_stat:0,
        }],
    }],
    pokemonInModal: [],
}

export const fetchPokemons = createAsyncThunk('data/fetchPokemons', async(_, {dispatch}) => {
    const pokemons: [] = await getPokemonsFromDB();

    const sessionSyncData = JSON.stringify(localStorage.getItem('sessionSynchronized'));

    if(pokemons.length === 0 || !sessionSyncData){
        dispatch(synchronizePokemons());
    }

    dispatch(setPokemons(pokemons));
})

export const fetchPokemonById = createAsyncThunk('data/fetchPokemons', async(pokemonId: number, {dispatch}) => {
    const pokemon = await getPokemonById(pokemonId);

    if(!pokemon) return null;

    return dispatch(setPokemonInModal(pokemon));
})

export const synchronizePokemons = createAsyncThunk('data/synchronizePokemons', async (_, {dispatch}) => {
    dispatch(setIsSynchronizing());

    const pokemonsRes = await getPokemonsFromAPI();

    const pokemonsDetailed = await Promise.all(
        pokemonsRes.map((pokemon: { url: string }) => getPokemonDetails(pokemon.url))
    );

    await performSynchronization(pokemonsDetailed);

    dispatch(setIsSynchronizing());
})

export const updatePokemon = createAsyncThunk('data/fetchPokemons', async (payload: Array<any>, {dispatch}) => {
    await Promise.all(
        payload.map(
            pokemonStat => updatePokemonStatsDB(
                {
                    pokemon_stat_id: pokemonStat.id,
                    base_stat: pokemonStat.base_stat
                }
            )
        )
    )
    dispatch(fetchPokemons());
})

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setPokemons: (state,action) => {
            state.pokemons = action.payload;
        },
        setPokemonInModal: (state,action) => {
            state.pokemonInModal = action.payload;
        },
        setPokemonStat: (state,action) => {
            const {statId, statNewValue} = action.payload;
            const stat = state.pokemonInModal.pokemonStats.findIndex(stat => stat.id === statId);
            state.pokemonInModal.pokemonStats[stat].base_stat = statNewValue;
        }
    }
})
export const {setPokemons, setPokemonInModal, setPokemonStat} = dataSlice.actions;

export default dataSlice.reducer;
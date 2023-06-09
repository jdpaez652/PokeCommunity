import { useEffect } from "react";

import './index.css'

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPokemons } from "../../app/slices/data/dataSlice";
import { shallowEqual } from "react-redux";
import PokemonList from "../../components/PokemonList";

const Home = () => {
    const dispatch = useAppDispatch();
    const pokemons = useAppSelector(state => state.data.pokemons, shallowEqual);

    useEffect(() => {
        dispatch(fetchPokemons());
    }, []);

    return (
        <>
            <div className="pokemon_list_container">
                {
                    pokemons.map(pokemon => {
                        return (
                            <PokemonList key={pokemon.pokemon_id} id={pokemon.pokemon_id} name={pokemon.name} types={pokemon.types} image={pokemon.image} />
                        )
                    })
                }
            </div>
        </>
    )
}
export default Home;
import { HiX } from 'react-icons/hi';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setPokemonInModal, setPokemonStat, updatePokemon } from '../../app/slices/data/dataSlice';
import { setShowModal } from '../../app/slices/ui/uiSlice';
import './index.css'

const Modal = () => {
    const dispatch = useAppDispatch();
    const showModal = useAppSelector(state => state.ui.showModal);
    const pokemon = useAppSelector(state => state.data.pokemonInModal);

    console.log(pokemon);

    const handleCloseModal = () => {
        dispatch(setShowModal(false));
        dispatch(setPokemonInModal([]));
    }

    const handlePokemonStatsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updatePokemon(pokemon.pokemonStats));
        handleCloseModal();
    }

    const renderPokemon = () => {
        if (Object.keys(pokemon).length > 0) {
            return (
                <>
                    <i onClick={handleCloseModal}><HiX /></i>

                    <div className='pokemon_title'>
                        <h1>{pokemon.name}</h1><p>{pokemon.types}</p>
                    </div>

                    <div className='pokemon_modal_container'>
                        <div className='pokemon_maindata_container'>
                            <img src={pokemon.image} alt={`${pokemon.name}_img`} />
                        </div>
                        <form className='pokemon_stats_container' onSubmit={handlePokemonStatsSubmit}>
                            <h1>Stats</h1>
                            {
                                pokemon.pokemonStats.map(stat => {
                                    return (
                                        <div className='stat_input_container' key={stat.id}>
                                            <label htmlFor="">{stat.stat.name}</label>
                                            <input type="number" value={stat.base_stat} onChange={(e) => { dispatch(setPokemonStat({ statId: stat.id, statNewValue: e.target.value })) }} />
                                        </div>
                                    )
                                })
                            }
                            <button className='submit_btn'>Submit</button>
                        </form>
                    </div>
                </>
            )
        }
    }

    return (
        <div className={`modal_container ${showModal ? 'show' : 'hide'}`}>
            {renderPokemon()}
        </div>
    )
}

export default Modal;
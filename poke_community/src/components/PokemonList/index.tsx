import PropTypes from 'prop-types';

import './index.css'
import Card from "../Card";
import { useAppDispatch } from '../../app/hooks';
import { setShowModal } from '../../app/slices/ui/uiSlice';
import { fetchPokemonById } from '../../app/slices/data/dataSlice';

const PokemonList = ({ id, name, types, image }) => {
    const dispatch = useAppDispatch();

    const handleOpenModal = (pokemonId: number) => {
        dispatch(fetchPokemonById(pokemonId));
        dispatch(setShowModal(true));
    }

    return (
        <>
            <div className={`pokemon_container`}
                onClick={() => handleOpenModal(id)}>
                <Card>
                    <h2>{name}</h2>
                    <hr />
                    <img src={image} alt={`${name}_img`} />
                    <hr />
                    <p>{types}</p>
                </Card>
            </div>
        </>
    )
}

PokemonList.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    types: PropTypes.string,
    image: PropTypes.string,
}

export default PokemonList;
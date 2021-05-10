import React, { useState } from 'react';
import pokemonList from './pokemonList';
import { choice } from './helpers';

/* Select element to choose from common pokemon. */
function PokemonSelect({ add, pokemon = pokemonList, removeAll }) {
  const [pokeIdx, setPokeIdx] = useState(0);

  const handleChange = (evt) => {
    setPokeIdx(evt.target.value);
  };

  const handleRemove = () => {
    removeAll();
  };

  return (
    <div>
      <select onChange={handleChange}>
        {pokemon.map((p, idx) => (
          <option key={idx} value={idx}>
            {p}
          </option>
        ))}
      </select>
      <button onClick={() => add(pokemon[pokeIdx])}>Catch one!</button>
      <button onClick={() => add(choice(pokemon))}>I'm feeling lucky</button>
      <button onClick={handleRemove}>Remove all</button>
    </div>
  );
}

export default PokemonSelect;

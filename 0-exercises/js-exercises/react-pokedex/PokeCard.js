import React from 'react';
import './PokeCard.css';

const PokeCard = ({ id, name, type, base_experience }) => {
  return (
    <div className="PokeCard">
      <h1 className="PokeCard-h1">{name}</h1>
      <div>
        <img
          className="PokeCard-img"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt=""
        />
      </div>
      <ul className="PokeCard-list">
        <li className="PokeCard-item">Type: {type}</li>
        <li className="PokeCard-item">EXP: {base_experience}</li>
      </ul>
    </div>
  );
};

export default PokeCard;

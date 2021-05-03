import React from 'react';
import Pokedex from './Pokedex.js';
import EightBall from './EightBall.js';
import balls from './balls.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <Pokedex />
      <EightBall answers={balls} />
    </div>
  );
}

export default App;

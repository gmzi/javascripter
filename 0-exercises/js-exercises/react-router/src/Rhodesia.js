import React from 'react';
import { Link } from 'react-router-dom';

function Rhodesia() {
  return (
    <div>
      <h1>Rhodesia Snack</h1>
      <img
        src="https://cdn11.bigcommerce.com/s-3stx4pub31/images/stencil/350x350/products/2656/6554/rhodesia__12590.1608288337.jpg"
        alt="Diet coke exploding everywhere."
      />
      <div>
        <Link to="/">Go home</Link>
      </div>
    </div>
  );
}

export default Rhodesia;

import React from 'react';

import Tita from './Tita';
import Rhodesia from './Rhodesia';
import Hersheys from './Hersheys';

import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <img src="https://lh3.googleusercontent.com/proxy/eS5V9aPc-KAdyvi9q0tqJXNrEgCxHD-nkyYZaB7BH1QVlCwYU2nXuUg7fVLgYdSF8rIurFn3EpsA3MloQEvdLVezOIEIOMUtXpGsJ8RcVtQ9ljP_cSODGB0kUPFK8tRuoWGCppvDaoB27FxurJIo8KW8MM8" />
      <ul>
        <li>
          <Link to="/tita">Give me Tita</Link>
          <Link to="/rhodesia">Give me Rhodesia</Link>
          <Link to="/hersheys">Give me Hersheys</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;

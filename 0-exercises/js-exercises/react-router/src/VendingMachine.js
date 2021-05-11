import React from 'react';

import Tita from './Tita';
import Rhodesia from './Rhodesia';
import Hersheys from './Hersheys';
import Home from './Home';

import NavBar from './NavBar';

import { BrowserRouter, Route } from 'react-router-dom';

const VendingMachine = () => {
  return (
    <div>
      <h1>Available Snacks:</h1>
      <BrowserRouter>
        <NavBar />
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/tita">
          <Tita />
        </Route>
        <Route exact path="/rhodesia">
          <Rhodesia />
        </Route>
        <Route exact path="/hersheys">
          <Hersheys />
        </Route>
      </BrowserRouter>
    </div>
  );
};

export default VendingMachine;

import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="NavBar">
      <NavLink exact to="/">
        Home
      </NavLink>
      <NavLink exact to="/tita">
        Tita
      </NavLink>
      <NavLink exact to="/rhodesia">
        Rhodesia
      </NavLink>
      <NavLink exact to="/hersheys">
        Hersheys
      </NavLink>
    </nav>
  );
}

export default NavBar;

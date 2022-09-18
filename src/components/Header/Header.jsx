import React from "react";
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/logo_header.svg';

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__link">
          <img className="header__logo" alt="Лого" src={logo}/>
        </Link>
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
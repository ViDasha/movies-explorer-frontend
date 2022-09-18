import React from "react";
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div className="navigation">
      <Link to="signup">
        <button className="navigation__registration-button">
          Регистрация
        </button>
      </Link>
      <Link to="signin">
        <button className="navigation__login-button">
          Войти
        </button>
      </Link>
    </div>
  );
}

export default Navigation;
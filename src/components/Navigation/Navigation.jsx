import React, { useRef} from "react";
import { Link, useLocation } from 'react-router-dom';

function Navigation({loggedIn}) {
  const { pathname } = useLocation();

  const ref = useRef(null);

  function handleOpenMenu() {
    const menu = ref.current;
    if (loggedIn) {
      menu.classList.add("navigation_logged_active");
    }
  }

  function handleCloseMenu() {
    const menu = ref.current;
    if (loggedIn) {
      menu.classList.remove("navigation_logged_active");
    }
  }

  return (
    <>
      {loggedIn && (
        <button className="navigation__burger" onClick={handleOpenMenu} type="button"></button>
      )}
      <nav className={`navigation ${loggedIn && "navigation_logged"}`} ref={ref}>
        <button className="navigation__burger-close" onClick={handleCloseMenu}></button>
        {loggedIn ? 
          (
            <div className="navigation__container">
              <ul className={`navigation__list ${loggedIn && "navigation__list_logged"}`}>
                <li className={`navigation__item navigation__item-main 
                  ${pathname === "/" && "navigation__item_select"}`}>
                <Link to='/' className="navigation__link">
                 Главная
                </Link>
                </li>
                <li className={`navigation__item ${pathname === "/movies" && "navigation__item_select"}`}>
                <Link to="/movies" className="navigation__link navigation__link_bold">
                  Фильмы
                </Link>
                </li>
                <li className={`navigation__item ${pathname === "/saved-movies" && "navigation__item_select"}`}>
                <Link to="/saved-movies" className="navigation__link">
                  Сохраненные фильмы
                </Link>
                </li>
              </ul>
              <Link to="/profile" className="navigation__link navigation__profile">
                Аккаунт
              </Link>
            </div>
          ) : (
          <>
            <Link to="/signup" className="navigation__registration-button">
              Регистрация
            </Link>
            <Link to="/signin" className="navigation__login-button">
              Войти
            </Link>
          </>
          )}
      </nav>
    </>
  );
}

export default Navigation;
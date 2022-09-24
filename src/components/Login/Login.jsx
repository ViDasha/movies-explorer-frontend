import React from "react";
import { Link } from "react-router-dom";
import logo from '../../images/logo_header.svg';

function Login() {

  return (
    <section className="login">
      <div className="login__logo">
        <Link to="/" className="header__link">
          <img className="header__logo" alt="Лого" src={logo}/>
        </Link>
      </div>
      <h2 className="login__title">Рады видеть!</h2>
      <form method="post" action="#" id="login-form" name="login-form" className="login__form" noValidate>
        <p className="login__item-type">E-mail</p>
        <input id="email" name="email" type="email" className="login__item" minLength="2" maxLength="40" required />
        <span className="email-error login__item-error"></span>
        <p className="login__item-type">Пароль</p>
        <input id="password" name="password" type="password" className="login__item" minLength="2" maxLength="40" required />
        <span className="password-error login__item-error"></span>
        <button type="submit" aria-label="Войти" name="save" className="login__button-save">Войти</button>
      </form>
      <div className="login__signin">
        <p className="login__question">Ещё не зарегистрированы?</p>
        <Link to="/signup" className="login__register-link">Регистрация</Link>
      </div>
    </section>
  );
}
  
  export default Login;
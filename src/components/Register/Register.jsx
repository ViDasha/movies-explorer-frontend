import React from "react";
import { Link } from "react-router-dom";
import logo from '../../images/logo_header.svg';

function Register(){
    return (
      <section className="login">
        <Link to="/" className="header__link">
          <img className="header__logo" alt="Лого" src={logo}/>
        </Link>
        <h2 className="login__title">Добро пожаловать!</h2>
        <form method="post" action="#" id="register-form" name="login-form" className="login__form" noValidate>
          <p className="login__item-type">Имя</p>
          <input id="name" name="name" type="name" className="login__item" minLength="2" required/>
          <span className="login__item-error"></span>
          <p className="login__item-type">E-mail</p>
          <input id="email" name="email" type="email" className="login__item" minLength="2" maxLength="40" required/>
          <span className="login__item-error"></span>
          <p className="login__item-type">Пароль</p>
          <input id="password" name="password" type="password" className="login__item login__item_type_error" minLength="2" maxLength="40" required/>
          <span className="login__item-error">Что-то пошло не так...</span>
          <button type="submit" aria-label="Зарегистрироваться" name="save" className="login__button-save">Зарегистрироваться</button>
        </form>
        <div className="login__signin">
          <p className="login__question">Уже зарегистрированы?</p>
          <Link to="/signin" className="login__register-link">Войти</Link>
        </div>
      </section>
  );
}

export default Register;
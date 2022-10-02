import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../../images/logo_header.svg';
import checkValidition from "../../utils/Validation";

function Login(props) {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isValids, setIsValid] = useState({ email: false, password: false });

  const handleChange = (e) => {
    const {name, value} = e.target;
    const {isValid, errorMessage} = checkValidition(name, value);
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: errorMessage });
    setIsValid({ ...isValids, [name]: isValid});
  }

  const checkIsValid = isValids.email && isValids.password;


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.email || !values.password){
      return;
    }
    props.onLogin(values.password, values.email);
  }

  return (
    <section className="login">
      <div className="login__logo">
        <Link to="/" className="header__link">
          <img className="header__logo" alt="Лого" src={logo}/>
        </Link>
      </div>
      <h2 className="login__title">Рады видеть!</h2>
      <form method="post" action="#" id="login-form" name="login-form" className="login__form" noValidate onSubmit={handleSubmit}>
        <p className="login__item-type">E-mail</p>
        <input id="email" name="email" type="email" className={`login__item ${!isValids.email && "login__item_type_error"}`} minLength="2" maxLength="40" required value={values.email} onChange={handleChange}/>
        <span className="email-error login__item-error">{errors.email}</span>
        <p className="login__item-type">Пароль</p>
        <input id="password" name="password" type="password" className={`login__item ${!isValids.password && "login__item_type_error"}`} minLength="8" maxLength="40" required value={values.password} onChange={handleChange}/>
        <span className="password-error login__item-error">{errors.password}</span>
        <button type="submit" aria-label="Войти" name="save" className={`login__button-save ${!checkIsValid && "login__button-save_disabled"}`} disabled={!checkIsValid}>Войти</button>
      </form>
      <div className="login__signin">
        <p className="login__question">Ещё не зарегистрированы?</p>
        <Link to="/signup" className="login__register-link">Регистрация</Link>
      </div>
    </section>
  );
}
  
  export default Login;
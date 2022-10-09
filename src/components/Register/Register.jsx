import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../../images/logo_header.svg';
import checkValidition from "../../utils/Validation";

function Register(props){
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [isValids, setIsValid] = useState({ email: false, password: false });
  const [formSubmission, setFormSubmission] = useState(false);


  const handleChange = (e) => {
    const {name, value} = e.target;
    const {isValid, errorMessage} = checkValidition(name, value);
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: errorMessage });
    setIsValid({ ...isValids, [name]: isValid});
  }

  const checkIsValid = isValids.name && isValids.email && isValids.password;

  const handleSubmit = (e) => {
    setFormSubmission(true);
    e.preventDefault();
    if (!values.name || !values.email || !values.password){
      setFormSubmission(false);
      return;
    }
    props.onRegister(values.name, values.password, values.email);
    setFormSubmission(false);
  }

    return (
      <section className="login">
        <Link to="/" className="header__link">
          <img className="header__logo" alt="Лого" src={logo}/>
        </Link>
        <h2 className="login__title">Добро пожаловать!</h2>
        <form method="post" action="#" id="register-form" name="login-form" className="login__form" noValidate onSubmit={handleSubmit}>
          <p className="login__item-type">Имя</p>
          <input id="name" name="name" type="name" className={`login__item ${!isValids.name && "login__item_type_error"}`} minLength="2" maxLength="100" required value={values.name} onChange={handleChange} disabled={formSubmission}/>
          <span className="login__item-error">{errors.name}</span>
          <p className="login__item-type">E-mail</p>
          <input id="email" name="email" type="email" className={`login__item ${!isValids.email && "login__item_type_error"}`} minLength="2" maxLength="40" required value={values.email} onChange={handleChange} disabled={formSubmission}/>
          <span className="login__item-error">{errors.email}</span>
          <p className="login__item-type">Пароль</p>
          <input id="password" name="password" type="password" className={`login__item ${!isValids.password && "login__item_type_error"}`} minLength="8" maxLength="40" required value={values.password} onChange={handleChange} disabled={formSubmission}/>
          <span className="login__item-error">{errors.password}</span>
          <button type="submit" aria-label="Зарегистрироваться" name="save" 
          className={`login__button-save login__button-save_type_register ${!checkIsValid && "login__button-save_disabled"}`} disabled={!checkIsValid}>Зарегистрироваться</button>
        </form>
        <div className="login__signin">
          <p className="login__question">Уже зарегистрированы?</p>
          <Link to="/signin" className="login__register-link">Войти</Link>
        </div>
      </section>
  );
}

export default Register;
import React, { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import checkValidition from "../../utils/Validation";

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const [values, setValues] = useState({ name: "", email: "" });
  const [isValids, setIsValid] = useState({ name: true, email: true });
  const [formSubmission, setFormSubmission] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    const {isValid} = checkValidition(name, value);
    setValues({ ...values, [name]: value });
    setIsValid({ ...isValids, [name]: isValid});
  }

  const checkIsValid = (isValids.name && isValids.email) && !(currentUser.name === values.name && currentUser.email === values.email);

  useEffect(() => {
    setValues({
        name: currentUser.name,
        email: currentUser.email
    })
  }, [currentUser])

  const handleSubmit = (e) => {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: values.name,
      email: values.email,
    }); 
    setValues({
      name: currentUser.name,
      email: currentUser.email
    });
    setFormSubmission(false);
  }

  const handleClickEdit = () => {
    setFormSubmission(true);
  }
  
  return (
    <section className="profile">
      <Header loggedIn={props.loggedIn}/>
      <div className="profile__container">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form className="profile__form" onSubmit={handleSubmit}>
        <div className="profile__item">
          <h3 className="profile__item-type">Имя</h3>
          <input 
            className={`profile__item-text ${!checkIsValid && currentUser.name !== values.name && "profile__item-text_incorrect"}`}
            type="text"
            name="name"
            id="name"
            minLength="2"
            maxLength="30"
            required
            onChange={handleChange}
            value={values.name || ''}
            disabled={formSubmission}
          />
        </div>
        <div className="profile__border" />
        <div className="profile__item">
          <h3 className="profile__item-type">E-mail</h3>
          <input
            className={`profile__item-text ${!checkIsValid && currentUser.email !== values.email && "profile__item-text_incorrect"}`}
            type="email"
            name="email"
            id="email"
            required
            onChange={handleChange}
            value={values.email || ''}
            disabled={formSubmission}
          />
        </div>
        <button className={`profile__button-edit ${!checkIsValid && "profile__button-edit_disabled"}`} 
          type="submit" 
          disabled={!checkIsValid}
          onClick={handleClickEdit}
        >Редактировать</button>
        </form>
        <button className="profile__button-exit" type="button" onClick={props.onSignOut}>Выйти из аккаунта</button>
      </div>
    </section>
  );
}
  
  export default Profile;
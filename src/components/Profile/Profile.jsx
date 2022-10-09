import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

function Profile({loggedIn}) {

  return (
    <section className="profile">
      <Header loggedIn={loggedIn}/>
      <div className="profile__container">
        <h2 className="profile__title">Привет, Дарья!</h2>
        <div className="profile__item">
          <h3 className="profile__item-type">Имя</h3>
          <p className="profile__item-text">Дарья</p>
        </div>
        <div className="profile__border" />
        <div className="profile__item">
          <h3 className="profile__item-type">E-mail</h3>
          <p className="profile__item-text">pochta@yandex.ru</p>
        </div>
        <button className="profile__button-edit" type="submit">Редактировать</button>
        <Link to="/">
          <button className="profile__button-exit" type="button">Выйти из аккаунта</button>
        </Link>
      </div>
    </section>
  );
}
  
  export default Profile;
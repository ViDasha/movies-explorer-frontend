import React, { useState } from "react";
import { Route } from 'react-router-dom';
import film from "../../images/film.jpg";

function MoviesCard() {
  const [isLiked, setIsLiked] = useState(false);

  function handleCardButton(e) {
    setIsLiked(!isLiked);
  }

  return (
    <section className="moviescard">
      <div className="moviescard__container">
        <div className="moviescard__info">
          <div className="moviescard__description">
            <h3 className="moviescard__title">33 слова о дизайне</h3>
            <p className="moviescard__time">1ч 42м</p>
          </div>
          <Route path="/movies">
            <button className={`moviescard__button ${ isLiked ? "moviescard__like" : "moviescard__dislike"}`} onClick={handleCardButton} type="button"></button>
          </Route>
          <Route path="/saved-movies">
            <button className='moviescard__button moviescard__delete' onClick={handleCardButton} type="button"></button>
          </Route>
        </div>
        <img src={film} className="moviescard__img" alt="Белая машина, девушка с фотоаппаратом и ребята"/>
      </div>
    </section>
)}

export default MoviesCard;
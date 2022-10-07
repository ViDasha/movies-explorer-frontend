import React from "react";
import { Route } from 'react-router-dom';
import {BASE_NOMO_URL} from '../../config';

function MoviesCard(props) {

  function onLikeButton(e) {
    props.handleLikeButton(props.movie);
  }

  const durationFilmHoursMinutes = (duration) => {
    return `${Math.floor(duration / 60)}ч ${duration % 60}м`;
  }

  const imageFilm = props.movie.image.url ? 
    `${BASE_NOMO_URL + props.movie.image.url}`: props.movie.image;


  const isLiked = props.savedMoviesList.find((sm) => sm.movieId === props.movie.id);

  return (
    <section className="moviescard">
      <div className="moviescard__container">
        <div className="moviescard__info">
          <div className="moviescard__description">
            <h3 className="moviescard__title">{props.movie.nameRU}</h3>
            <p className="moviescard__time">{durationFilmHoursMinutes(props.movie.duration)}</p>
          </div>
          <Route path="/movies">
            <button className={`moviescard__button ${ isLiked ? "moviescard__like" : "moviescard__dislike"}`} onClick={onLikeButton} type="button"></button>
          </Route>
          <Route path="/saved-movies">
            <button className='moviescard__button moviescard__delete' onClick={onLikeButton} type="button"></button>
          </Route>
        </div>
        <a href={props.movie.trailerLink} target="blank">
          <img src={imageFilm} className="moviescard__img" alt={props.movie.nameRU}/>
        </a>
      </div>
    </section>
)}

export default MoviesCard;
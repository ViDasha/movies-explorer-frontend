import React, {useState} from 'react';
import MoviesCard from "../MoviesCard/MoviesCard";
import {initialCountFilms} from "../../utils/constants";


function MoviesCardList(props) {
  const [countFilms, setCountFilms] = useState(initialCountFilms());

  function handleClickMore() {
    setCountFilms(countFilms + initialCountFilms());
  }

  return (
    <section className="moviescardlist">
      <div className="moviescardlist__grid">
        {props.isNotFound && props.moviesList.length === 0 && <p className="moviescardlist__text">Ничего не найдено</p>}
        {props.moviesList.slice(0, countFilms).map((movie) =>
          <MoviesCard 
            key={movie.id || movie._id}
            movie={movie}
            handleLikeButton={props.handleLikeButton}
          />
        )}
      </div>
        {props.moviesList.length > countFilms && 
          <button className="moviescardlist__button" type="button" onClick={handleClickMore}>Ещё</button>}
    </section>
)}

export default MoviesCardList;
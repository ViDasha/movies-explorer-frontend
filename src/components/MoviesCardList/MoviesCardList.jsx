import React, {useState} from 'react';
import { Route } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import {initialCountFilms} from "../../utils/constants";


function MoviesCardList(props) {
  const [countFilms, setCountFilms] = useState(initialCountFilms());
  const [movieList, setMovieList] = React.useState([]);

  function handleClickMore() {
    setCountFilms(countFilms + initialCountFilms());
  }

  React.useEffect(() => {
    if (props.moviesList.length) {
        const newMoviesList = props.moviesList.filter((item, i) => i < countFilms);
        setMovieList(newMoviesList);
    }
  }, [
    props.moviesList,
    countFilms
  ]);

  return (
    <section className="moviescardlist">
      <div className="moviescardlist__grid">
        {props.isNotFound && props.moviesList.length === 0 && <p className="moviescardlist__text">Ничего не найдено</p>}
        {movieList.slice(0, countFilms).map((movie) =>
          <MoviesCard 
            key={movie.id || movie._id}
            movie={movie}
            handleLikeButton={props.handleLikeButton}
            savedMoviesList={props.savedMoviesList}
          />
        )}
      </div>
      <Route path="/movies">
        {props.moviesList.length > countFilms && 
          <button className="moviescardlist__button" type="button" onClick={handleClickMore}>Ещё</button>}
      </Route>
    </section>
)}

export default MoviesCardList;
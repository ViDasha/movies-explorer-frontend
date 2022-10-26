import React, {useEffect, useContext} from 'react';
import Header from '../Header/Header.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import Footer from '../Footer/Footer.jsx';
import {maxDurationShortMovie} from '../../utils/constants';
import { MovieContext } from '../../contexts/MovieContext.js';
import mainApi from '../../utils/MainApi.js';

function SavedMovies(props) {
  const { moviesState, setMoviesState } = useContext(MovieContext);
  
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    mainApi.getMovies(jwt)
      .then((savedMoviesData) => {
        setMoviesState({
          ...moviesState,
          savedMovies: savedMoviesData,
          savedMoviesCheckbox: false,
          savedMoviesSearchText: "",
          filteredSavedMovies: savedMoviesData,
        });
      })
      .catch(console.log);
  }, []);
  

  function filterMovies(state) {
    const { savedMoviesSearchText, savedMovies, savedMoviesCheckbox } = state;
    const filteredSavedMovies = savedMovies.filter(
      ({ nameRU, nameEN, duration }) => {
        const nameFilm = `${nameRU}${nameEN}`.toLowerCase();
        const chosenNameFilm = nameFilm.includes(savedMoviesSearchText.toLowerCase());
        if (savedMoviesCheckbox) {
          return chosenNameFilm && filterShortMovies(duration);
        }
        return chosenNameFilm;
      }
    );
    return filteredSavedMovies;
  }

  function filterShortMovies(duration) {
    return duration <= maxDurationShortMovie;
  }

  function onChangeInput(e) {
    setMoviesState({
      ...moviesState,
      savedMoviesSearchText: e.target.value,
    });
  }

  function handleSearchSubmit() {
    const filteredSavedMovies = filterMovies(moviesState);
    setMoviesState({
      ...moviesState,
      filteredSavedMovies,
      notFoundSavedMovies: filteredSavedMovies.length === 0,
    });
  }

  function toggleCheckbox() {
    const filteredSavedMovies = filterMovies({
      ...moviesState,
      savedMoviesCheckbox: !moviesState.savedMoviesCheckbox,
    });
    setMoviesState({
      ...moviesState,
      filteredSavedMovies,
      savedMoviesCheckbox: !moviesState.savedMoviesCheckbox,
      notFoundSavedMovies: filteredSavedMovies.length === 0,
    });
  }

  useEffect(() => {
    const filteredSavedMovies = filterMovies(moviesState);
    setMoviesState({
      ...moviesState,
      filteredSavedMovies,
      notFoundSavedMovies: filteredSavedMovies.length === 0,
    });
  }, [moviesState.savedMoviesCheckbox, moviesState.savedMovies.length]);


  return (
    <div className="savedmovies">
      <Header loggedIn={props.loggedIn}/>
      <main className="savedmovies__main">
        <SearchForm
          onChangeInput={onChangeInput}
          onSubmit={handleSearchSubmit}
          toggleCheckbox={toggleCheckbox}
          inputValue={moviesState.savedMoviesSearchText}
          checkbox={moviesState.savedMoviesCheckbox}
          setInfoTooltipOpen={props.setInfoTooltipOpen}
          setIsSuccess={props.setIsSuccess}
          setMessage={props.setMessage}
        />
        <MoviesCardList 
          handleLikeButton={props.onClickDelete}
          isNotFound={moviesState.notFoundSavedMovies}
          moviesList={moviesState.filteredSavedMovies}
        />
      </main>
      <Footer />
    </div>
)}

export default SavedMovies;
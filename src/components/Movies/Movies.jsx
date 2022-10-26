import React, {useState, useEffect, useContext } from 'react';
import Header from '../Header/Header.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import Footer from '../Footer/Footer.jsx';
import Prealoder from '../Preloader/Preloader.jsx';
import moviesApi from '../../utils/MoviesApi.js';
import { errorMessages, maxDurationShortMovie } from '../../utils/constants.js';
import {MovieContext} from '../../contexts/MovieContext';


function Movies(props) {
  const { moviesState, setMoviesState } = useContext(MovieContext);
  const [isDataLoading, setIsDataLoading] = useState(false);

  function filterMovies() {
    const searchText = moviesState.moviesSearchText.toLowerCase();
    if (searchText === '') {
      return;
    }
    const filteredMovies = moviesState.list.filter(
      ({ nameRU, nameEN, duration }) => {
        const nameFilm = `${nameRU}${nameEN}`.toLowerCase();
        const chosenNameFilm = nameFilm.includes(searchText);
        if (moviesState.moviesCheckbox) {
          return chosenNameFilm && filterShortMovies(duration);
        }
        return chosenNameFilm;
      }
    );
    setMoviesState({
      ...moviesState,
      filteredMovies,
      notFoundMovies: filteredMovies.length === 0,
    });
    setIsDataLoading(false);
    localStorage.setItem("moviesState", JSON.stringify(moviesState));
  };

  function filterShortMovies(duration) {
    return duration <= maxDurationShortMovie;
  }

  function handleSearchSubmit() {
    if (moviesState.list.length !== 0) {
      filterMovies();
    } else {
      setIsDataLoading(true);
      const jwt = localStorage.getItem('jwt');
      moviesApi.getMovies(jwt)
        .then((res) => {
          setMoviesState({ ...moviesState, list: res });
          setIsDataLoading(false);
          filterMovies();
        })
        .catch((err) => {
          props.setInfoTooltipOpen(true);
          props.setIsSuccess(false);
          props.setMessage(errorMessages.connectionProblem);
          console.log(err);
        })
        .finally(() => {
          setIsDataLoading(false);
        });
    }
  }

  function onChangeInput(e) {
    setMoviesState({
      ...moviesState,
      moviesSearchText: e.target.value,
    });
  }

  function handleLikeButton(movie) {
    const savedMovie = moviesState.savedMovies.find(
      (item) => item.movieId === movie.id,
    );
    if (savedMovie) {
      props.onClickDelete(movie);
    } else {
      props.onClickSave(movie);
    }
  }

  function toggleCheckbox() {
    setMoviesState({
      ...moviesState,
      moviesCheckbox: !moviesState.moviesCheckbox,
    });
  }

  useEffect(() => {
    if (moviesState.list.length === 0) {
      const jwt = localStorage.getItem('jwt');
      moviesApi.getMovies(jwt)
        .then((res) => {
          setMoviesState({ ...moviesState, list: res });
          filterMovies();
        })
        .catch((err) => {
          props.setInfoTooltipOpen(true);
          props.setIsSuccess(false);
          props.setMessage(errorMessages.connectionProblem);
          console.log(err);
        })
    }
  }, []);

 
  useEffect(() => {
    filterMovies();
  }, [moviesState.moviesCheckbox, moviesState.list.length, moviesState.savedMovies.length]);


  return (
    <div className="movies">
      <Header loggedIn={props.loggedIn}/>
      <main className="movies__main">
        <SearchForm
          onChangeInput={onChangeInput}
          onSubmit={handleSearchSubmit}
          toggleCheckbox={toggleCheckbox}
          inputValue={moviesState.moviesSearchText}
          checkbox={moviesState.moviesCheckbox}
          setInfoTooltipOpen={props.setInfoTooltipOpen}
          setIsSuccess={props.setIsSuccess}
          setMessage={props.setMessage}
        />
        {isDataLoading ? <Prealoder /> : 
          <MoviesCardList 
            handleLikeButton={handleLikeButton}
            isNotFound={moviesState.notFoundMovies}
            moviesList={moviesState.filteredMovies}
          />
        }
      </main>
      <Footer />
    </div>
)}

export default Movies;
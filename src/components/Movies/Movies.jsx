import React, {useState, useEffect } from 'react';
import Header from '../Header/Header.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import Footer from '../Footer/Footer.jsx';
import Prealoder from '../Preloader/Preloader.jsx';
import moviesApi from '../../utils/MoviesApi.js';
import { errorMessages, maxDurationShortMovie } from '../../utils/constants.js';


function Movies(props) {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [shortMovies, setShortMovies] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isNotFound, setisNotFound] = useState(false);
  const [inputValue, setInputValue] = useState(false);

  function filterMovies(movies, request, shortMoviesSwitch) {
    const foundMovies = movies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(request.toLowerCase());
    });

    if (shortMoviesSwitch) {
        return filterShortMovies(foundMovies);
    } else {
        return foundMovies;
    }
}

function handleSetFilteredMovies(movies, request, shortMoviesSwitch) {
    const moviesList = filterMovies(movies, request, shortMoviesSwitch);
    moviesList.length === 0 ? setisNotFound(true) : setisNotFound(false);
    setFilteredMovies(
        shortMoviesSwitch ? filterShortMovies(moviesList) : moviesList
    );
    localStorage.setItem("movies", JSON.stringify(moviesList));
}

function handleSearchSubmit(inputValue) {
    setIsDataLoading(true);
    localStorage.setItem("movieSearch", inputValue);
    localStorage.setItem("shortMovies", shortMovies);
    const jwt = localStorage.getItem('jwt');
      moviesApi.getMovies(jwt)
      .then((res) => {
          handleSetFilteredMovies(res, inputValue, shortMovies);
          setIsDataLoading(false);
      })
      .catch((err) => {
        props.setInfoTooltipOpen(true);
        props.setIsSuccess(false);
        props.setMessage(errorMessages.connectionProblem);
        console.log(err);
      })
      .finally(() => setIsDataLoading(false));
}

function handleLikeButton(movie) {
  const savedMovie = props.savedMoviesList.find(
    (item) => item.movieId === movie.id,
  );
  if (savedMovie) {
    props.onClickDelete(movie);
  } else {
    props.onClickSave(movie);
  }
}

function filterShortMovies(movies) {
    return movies.filter((movie) => movie.duration <= maxDurationShortMovie);
}

function toggleCheckbox() {
  setShortMovies(!shortMovies);
  localStorage.setItem("shortMovies", !shortMovies);
}



useEffect(() => {
  if (localStorage.getItem("movieSearch")) {
      setInputValue(localStorage.getItem("movieSearch"));
  }
}, []);

useEffect(() => {
    if (localStorage.getItem("shortMovies") === "true") {
        setShortMovies(true);
    } else {
        setShortMovies(false);
    }

    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"));
      if (localStorage.getItem("shortMovies") === "true") {
          setFilteredMovies(filterShortMovies(movies));
      } else {
          setFilteredMovies(movies);
      }
  }
}, [props.currentUser]);

  return (
    <div className="movies">
      <Header loggedIn={props.loggedIn}/>
      <main className="movies__main">
        <SearchForm
          shortMovies={shortMovies}
          onSubmit={handleSearchSubmit}
          toggleCheckbox={toggleCheckbox}
          inputValue={inputValue}
          checkbox={shortMovies}
        />
        {isDataLoading ? <Prealoder /> : 
          <MoviesCardList 
            handleLikeButton={handleLikeButton}
            savedMoviesList={props.savedMoviesList}
            isNotFound={isNotFound}
            moviesList={filteredMovies}
          />
        }
      </main>
      <Footer />
    </div>
)}

export default Movies;
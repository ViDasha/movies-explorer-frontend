import React, {useState, useEffect} from 'react';
import Header from '../Header/Header.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import Footer from '../Footer/Footer.jsx';
import {maxDurationShortMovie} from '../../utils/constants';

function SavedMovies(props) {
  const [shortMovies, setShortMovies] = useState(false);
  const [isNotFound, setisNotFound] = useState(false);
  const [inputValue, setInputValue] = useState(false);
  const [showedMovies, setShowedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState(props.savedMoviesList);

  function filterMovies(movies, request, shortMoviesSwitch) {
    const foundMovies = movies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(request.toLowerCase())
    });

    if (shortMoviesSwitch) {
        return filterShortMovies(foundMovies);
    } else {
        return foundMovies;
    }
}

function filterShortMovies(movies) {
    return movies.filter((movie) => movie.duration <= maxDurationShortMovie);
}

function handleSearchSubmit(inputValue) {
    localStorage.setItem('savedMoviesSearch', inputValue);
    const filteredSavedMovies = filterMovies(props.savedMoviesList, inputValue, shortMovies);
    if (filteredSavedMovies.length === 0) {
      setisNotFound(true);
      setFilteredMovies([]);
    } else {
      setisNotFound(false);
      setShowedMovies(filteredSavedMovies);
      setFilteredMovies(filteredSavedMovies);
      localStorage.setItem('savedMovies', JSON.stringify(props.savedMoviesList));
    }
}


function toggleCheckbox() {
    if (!shortMovies) {
        setShortMovies(true);
        localStorage.setItem('shortSavedMovies', true);
        setShowedMovies(filterShortMovies(filteredMovies));
        showedMovies.length === 0 ? setisNotFound(true) : setisNotFound(false);
    } else {
        setShortMovies(false);
        localStorage.setItem('shortSavedMovies', false);
        filteredMovies.length === 0 ? setisNotFound(true) : setisNotFound(false);
        setShowedMovies(filteredMovies);
    }
}

useEffect(() => {
  if (localStorage.getItem('savedMoviesSearch')) {
      setInputValue(localStorage.getItem('savedMoviesSearch'));
  }
}, []);


useEffect(() => {
  if (localStorage.getItem('shortSavedMovies') === 'true') {
      setShortMovies(true);
      setShowedMovies(filterShortMovies(props.savedMoviesList));
  } else {
      setShortMovies(false);
      setShowedMovies(props.savedMoviesList);
  }
}, [props.savedMoviesList, showedMovies]);

  return (
    <div className="savedmovies">
      <Header loggedIn={props.loggedIn}/>
      <main className="savedmovies__main">
        <SearchForm 
          shortMovies={shortMovies}
          onSubmit={handleSearchSubmit}
          toggleCheckbox={toggleCheckbox}
          inputValue={inputValue}
          checkbox={shortMovies}
        />
        <MoviesCardList 
          handleLikeButton={props.onClickDelete}
          savedMoviesList={props.savedMoviesList}
          isNotFound={isNotFound}
          moviesList={showedMovies}
        />
      </main>
      <Footer />
    </div>
)}

export default SavedMovies;
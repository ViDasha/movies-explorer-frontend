import React from 'react';
import Header from '../Header/Header.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import Footer from '../Footer/Footer.jsx';

function SavedMovies({loggedIn}) {
  return (
    <div className="savedmovies">
      <Header loggedIn={loggedIn}/>
      <main className="savedmovies__main">
        <SearchForm />
        <MoviesCardList />
      </main>
      <Footer />
    </div>
)}

export default SavedMovies;